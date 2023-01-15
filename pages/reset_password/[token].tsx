import { AnimatePresence } from "framer-motion";
import jwtDecode from "jwt-decode";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { UserContext } from "../../components/Context/UserContext";
import InputGroup from "../../components/InputGroup";
import Logo from "../../components/Logo";
import LottieAnimation from "../../components/Lottie";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Signup.module.css";
import User from "../../Types/User";
import {
  validateEmailField,
  validateLoginInputs,
  validateResetPasswordEmail,
  validateResetPasswordInputs,
  validateTextField,
} from "../../utilities/TextFieldValidation";
import client from "../api/Services/AxiosClient";
import { motion } from "framer-motion";
import LoaderData from "../../components/Lottie/loader.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ErrorProps {
  password?: string;
  confirmPassword?: string;
}

const ResetPassword = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user", "applicant"]);
  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorProps>({
    password: "",
    confirmPassword: "",
  });
  const [backendError, setBackendError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const { token } = router.query;
    if (token)
      try {
        const user_info: any = jwtDecode(token as string);
        setEmail(user_info.email);
        setUserId(user_info._id);
      } catch (err) {
        alert("This link has expired, please request for another one");
        router.replace("/login");
      }
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors(validateResetPasswordInputs({ password, confirmPassword }));
    if (
      confirmPassword &&
      password &&
      Object.values(errors).every((value) => !Boolean(value))
    ) {
      try {
        setLoading(true);
        setBackendError("");
        const payload = { password };
        const { data } = await client.post(
          `users/password_reset/${userId}`,
          payload
        );
        toast.success(data.message);
        setTimeout(() => router.push("/login"));
      } catch (error: any) {
        if (error.response?.status == 400)
          setBackendError(error.response?.data?.message);
        else if (error?.response?.status == 500) {
          alert(error.response?.data?.message);
        } else {
          alert("Please Check your Internet Connection 🥲");
        }
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <main className={styles.main}>
      <ToastContainer />
      <Head>
        <title>Med Suite - Create an Account</title>
      </Head>
      <div className={styles.navcontainer}>
        <Navbar />
      </div>
      <div className={styles.pageContainer}>
        <section className={styles.imageContainer}>
          <img className={styles.bgImage} src="/images/nursebg.png" />
          <div className={styles.logo}>
            <Logo />
          </div>
        </section>
        <section className={styles.navTextContainer}>
          <div>
            <h1 className={styles.navTitle}>Reset Password</h1>
            <p className={styles.email}>{email}</p>
            <form onSubmit={onSubmit} className={styles.signupForm}>
              <section className={styles.inputsContainer}>
                <InputGroup
                  type="password"
                  label="New Password"
                  setValue={setPassword}
                  value={password}
                  error={errors.password}
                  onBlur={() =>
                    setErrors({
                      ...errors,
                      password: validateTextField(password, "Email", 8)
                        ? validateTextField(password, "Email", 8)
                        : "",
                    })
                  }
                />
                <InputGroup
                  type="password"
                  label="Confirm Password"
                  setValue={setConfirmPassword}
                  value={confirmPassword}
                  error={errors.confirmPassword}
                  onBlur={() =>
                    setErrors({
                      ...errors,
                      confirmPassword: validateTextField(
                        confirmPassword,
                        "Confirm Password"
                      )
                        ? validateTextField(confirmPassword, "Confirm Password")
                        : "",
                    })
                  }
                />
              </section>
              <AnimatePresence>
                {backendError && (
                  <motion.p
                    className={styles.backendError}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {backendError}
                  </motion.p>
                )}
              </AnimatePresence>
              <button className={styles.signupButton}>
                <AnimatePresence>
                  {!loading && (
                    <motion.span
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Recover Password
                    </motion.span>
                  )}
                  {loading && (
                    <LottieAnimation
                      animationData={LoaderData}
                      width={55}
                      height={55}
                    />
                  )}
                </AnimatePresence>
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ResetPassword;
