import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import FadeIn from "../../components/FadeIn";
import InputGroup from "../../components/InputGroup";
import Logo from "../../components/Logo";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Signup.module.css";

const Signup: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

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
              <form className={styles.signupForm}>
                <section className={styles.inputsContainer}>
                  <InputGroup
                    label="Email address"
                    setValue={setEmail}
                    value={email}
                  />
                  <InputGroup
                    password
                    label="Password"
                    setValue={setPassword}
                    value={password}
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
