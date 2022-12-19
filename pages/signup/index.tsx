import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";
import FadeIn from "../../components/FadeIn";
import InputGroup from "../../components/InputGroup";
import Logo from "../../components/Logo";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Signup.module.css";
import "../../styles/Signup.module.css";
import {
  validateEmailField,
  validateSignupInputs,
  validateTextField,
} from "../../utilities/TextFieldValidation";
import client from "../api/Services/AxiosClient";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import User from "../../Types/User";
import { UserContext } from "../../components/Context/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import LottieAnimation from "../../components/Lottie";
import LoaderData from "../../components/Lottie/loader.json";

interface ErrorProps {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Signup: NextPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user", "applicant"]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<ErrorProps>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState("");
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors(validateSignupInputs({ email, password, confirmPassword }));
    if (
      email &&
      password &&
      confirmPassword &&
      Object.values(errors).every((value) => !Boolean(value))
    ) {
      try {
        setLoading(true);
        setBackendError("");
        const payload = { email, password };
        const { data } = await client.post("/users/signup", payload);
        const { token } = data;
        const user: User = jwtDecode(token);
        console.log(user);
        setUser(user);
        setCookie("user", user, {
          path: "/",
          maxAge: 1800,
        });
        const { data: applicantData } = await client.get(
          `/applicant/${user.applicantId}`
        );
        setCookie("applicant", applicantData.applicant, {
          path: "/",
          maxAge: 1800,
        });
        router.push("/application_form/contact_details");
      } catch (error: any) {
        if (error.response.status == 400)
          setBackendError(error.response?.data?.message);
        else {
          alert(error.response?.data?.message);
        }
        console.log(error.response.data);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <FadeIn>
      <main className={styles.main}>
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
              <h1 className={styles.navTitle}>Create an Account</h1>
              <p className={styles.navTitleSubText}>
                Already have an account?{" "}
                <Link href={"/login"}>
                  <span>Login</span>
                </Link>
              </p>
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
                  <InputGroup
                    type="password"
                    label="Password"
                    setValue={setPassword}
                    value={password}
                    error={errors.password}
                    onBlur={() =>
                      setErrors({
                        ...errors,
                        password: validateTextField(password, "Password", 8)
                          ? validateTextField(password, "Password", 8)
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
                          ? validateTextField(
                              confirmPassword,
                              "Confirm Password",
                              8
                            )
                          : password == confirmPassword
                          ? ""
                          : "Passwords Must Match",
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
                  {!loading && <span>Create account</span>}
                  {loading && (
                    <LottieAnimation
                      animationData={LoaderData}
                      width={55}
                      height={55}
                    />
                  )}
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </FadeIn>
  );
};

export default Signup;
