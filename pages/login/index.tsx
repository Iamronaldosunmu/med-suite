import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FormEvent, useContext, useEffect, useState } from "react";
import FadeIn from "../../components/FadeIn";
import InputGroup from "../../components/InputGroup";
import Logo from "../../components/Logo";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Signup.module.css";
import {
  validateContactDetailsInputs,
  validateDocumentInputs,
  validateEmailField,
  validateExperienceInputs,
  validateLoginInputs,
  validateTextField,
} from "../../utilities/TextFieldValidation";
import client from "../api/Services/AxiosClient";
import jwtDecode from "jwt-decode";
import User from "../../Types/User";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { UserContext } from "../../components/Context/UserContext";
import LottieAnimation from "../../components/Lottie";
import LoaderData from "../../components/Lottie/loader.json";
import { AnimatePresence, motion } from "framer-motion";

interface ErrorProps {
  email?: string;
  password?: string;
}

const Signup: NextPage = () => {
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
  useEffect(() => {
    if (cookies.user && cookies.applicant) {
      if (!cookies.applicant.paymentCompleted) {
        // const noContactDetailsErrors = Object.values(
        //   validateContactDetailsInputs({ ...cookies.applicant.contactDetails })
        // ).every((value) => !Boolean(value));
        // const noDocumentErrors = Object.values(
        //   validateDocumentInputs({ ...cookies.applicant.documents })
        // ).every((value) => !Boolean(value));
        // const noExperienceErrors = Object.values(
        //   validateExperienceInputs({ ...cookies.applicant.experience })
        // ).every((value) => !Boolean(value));

        // if (noContactDetailsErrors && noDocumentErrors && noExperienceErrors) {
        //   router.push("/application_form/application_fee");
        // } else {
        //   router.push("/application_form/contact_details");
        router.push(`/application_form/${cookies.applicant.currentPage}`);
        // }
      } else {
        router.push("/payment_successful");
      }
    }
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors(validateLoginInputs({ email, password }));
    if (
      email &&
      password &&
      Object.values(errors).every((value) => !Boolean(value))
    ) {
      try {
        setLoading(true);
        setBackendError("");
        const payload = { email, password };
        const { data } = await client.post("/users/login", payload);
        const { token } = data;
        const user: User = jwtDecode(token);
        const { data: applicantData } = await client.get(
          `/applicant/${user.applicantId}`
        );
        setCookie("applicant", applicantData.applicant, {
          path: "/",
          maxAge: 1800,
        });
        setUser(user);
        setCookie("user", user, {
          path: "/",
          maxAge: 1800,
        });
        if (!applicantData.applicant.paymentCompleted) {
          // const noContactDetailsErrors = Object.values(
          //   validateContactDetailsInputs({
          //     ...applicantData.applicant.contactDetails,
          //   })
          // ).every((value) => !Boolean(value));
          // const noDocumentErrors = Object.values(
          //   validateDocumentInputs({ ...applicantData.applicant.documents })
          // ).every((value) => !Boolean(value));
          // const noExperienceErrors = Object.values(
          //   validateExperienceInputs({ ...applicantData.applicant.experience })
          // ).every((value) => !Boolean(value));
          // console.log(
          //   noContactDetailsErrors,
          //   noDocumentErrors,
          //   noExperienceErrors
          // );
          router.push(
            `application_form/${applicantData.applicant.currentPage}`
          );
        } else {
          router.push("/payment_successful");
        }
      } catch (error: any) {
        if (error.response?.status == 400)
          setBackendError(error.response?.data?.message);
        else {
          alert(error.response?.data?.message);
        }
        console.log(error.response?.data);
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
              <h1 className={styles.navTitle}>Login to Your Account</h1>
              <p className={styles.navTitleSubText}>
                Don&apos;t have an account?{" "}
                <Link href={"/signup"}>
                  <span>Sign Up</span>
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
                        password: validateTextField(password, "Password")
                          ? validateTextField(password, "Password", 8)
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
                        Login
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
    </FadeIn>
  );
};

export default Signup;
