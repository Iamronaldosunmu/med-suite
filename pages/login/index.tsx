import { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useState } from "react";
import FadeIn from "../../components/FadeIn";
import InputGroup from "../../components/InputGroup";
import Logo from "../../components/Logo";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Signup.module.css";
import {
  validateEmailField,
  validateLoginInputs,
  validateTextField,
} from "../../utilities/TextFieldValidation";

interface ErrorProps {
  email?: string;
  password?: string;
}

const Signup: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<ErrorProps>({
    email: "",
    password: "",
  });
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors(validateLoginInputs({ email, password }));
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
                <button className={styles.signupButton}>Login</button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </FadeIn>
  );
};

export default Signup;
