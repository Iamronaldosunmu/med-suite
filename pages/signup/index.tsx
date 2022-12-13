import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
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

interface ErrorProps {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Signup: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<ErrorProps>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors(validateSignupInputs({ email, password, confirmPassword }));
  };
  const router = useRouter();

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
                <button className={styles.signupButton}>Create account</button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </FadeIn>
  );
};

export default Signup;
