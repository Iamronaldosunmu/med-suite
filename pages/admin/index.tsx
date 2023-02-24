import { useState, FormEvent } from "react";
import { useCookies } from "react-cookie";
import InputGroup from "../../components/InputGroup";
import Logo from "../../components/Logo";
import styles from "../../styles/AdminLoginPage.module.css";
import client from "../api/Services/AxiosClient";
import signupstyles from "../../styles/Signup.module.css";
import {
  validateContactDetailsInputs,
  validateDocumentInputs,
  validateEmailField,
  validateExperienceInputs,
  validateLoginInputs,
  validateTextField,
} from "../../utilities/TextFieldValidation";
import User from "../../Types/User";
import jwtDecode from "jwt-decode";
import LottieAnimation from "../../components/Lottie";
import LoaderData from "../../components/Lottie/loader.json";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

interface ErrorProps {
  email?: string;
  password?: string;
}

const AdminLoginPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["admin"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState("");
  const router = useRouter();
  const [errors, setErrors] = useState<ErrorProps>({
    email: "",
    password: "",
  });

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
        const { data } = await client.post("/admin/login", payload);
        const { token } = data;
        const admin: User = jwtDecode(token);
        console.log(admin);
        setCookie("admin", admin, {
          path: "/",
          maxAge: 1800,
        });
        router.push("/admin/dashboard");
      } catch (error: any) {
        console.log(error);
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
    <AnimatePresence>
    <main className={styles.pageContainer}>
      <section className={styles.content}>
        <motion.figure
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: { delay: 0.2, duration: 0.2, ease: "easeIn" },
            }}
            exit={{opacity: 0}}
            className={styles.logo}
            >
          <img src="/icons/medsuitelogo.svg" />
        </motion.figure>
        <motion.header
          exit={{opacity: 0}}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.32, duration: 0.2, ease: "easeIn" },
          }}
          className={styles.header}
          >
          Admin Dashboard
        </motion.header>
        <form onSubmit={onSubmit} className={styles.form}>
          <motion.div
            exit={{opacity: 0}}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.44, duration: 0.2, ease: "easeIn" },
            }}
            className={styles.inputContainer}
            >
            <InputGroup
              label="Email Address"
              value={email}
              error={errors.email}
              setValue={setEmail}
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
          </motion.div>
          <AnimatePresence>
            {backendError && (
              <motion.p
                className={styles.backendError}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ color: "red" }}
                >
                {backendError}
              </motion.p>
            )}
          </AnimatePresence>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.56, duration: 0.2, ease: "easeIn" },
            }}
            className={`${signupstyles.signupButton} ${styles.signupButton}`}
              exit={{opacity: 0}}
          >
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
          </motion.button>
        </form>
      </section>
    </main>

    </AnimatePresence>
  );
};

export default AdminLoginPage;
