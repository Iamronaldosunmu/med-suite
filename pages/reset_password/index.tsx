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
  validateTextField,
} from "../../utilities/TextFieldValidation";
import client from "../api/Services/AxiosClient";
import { motion } from "framer-motion";
import LoaderData from "../../components/Lottie/loader.json";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

interface ErrorProps {
  email?: string;
  password?: string;
}

const ResetPasswordPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user", "applicant"]);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorProps>({
    email: "",
    password: "",
  });
  const { user, setUser } = useContext(UserContext);
  const [backendError, setBackendError] = useState("");
  const router = useRouter();
  //   useEffect(() => {
  //     if (cookies.user && cookies.applicant) {
  //       if (!cookies.applicant.paymentCompleted) {
  //         router.push(
  //           `/application_form/${
  //             cookies.applicant?.currentPage
  //               ? cookies.applicant?.currentPage
  //               : "contact_details"
  //           }`
  //         );
  //       } else {
  //         router.push("/payment_successful");
  //       }
  //     }
  //   }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors(validateResetPasswordEmail({ email }));
    if (email && Object.values(errors).every((value) => !Boolean(value))) {
      try {
        setLoading(true);
        setBackendError("");
        const payload = { email };
        const { data } = await client.post("users/password_reset", payload);
        toast.success(data.message);
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
            <h1 className={styles.navTitle}>Recover Password</h1>
            <form onSubmit={onSubmit} className={styles.signupForm}>
              <section className={styles.inputsContainer}>
                <InputGroup
                  label="Email address"
                  setValue={setEmail}
                  value={email}
                  error={errors.email}
                  onBlur={() =>
                    setErrors({
                      ...errors,
                      email: validateEmailField(email, "Email")
                        ? validateEmailField(email, "Email")
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

export default ResetPasswordPage;
