import Head from "next/head";
import FadeIn from "../components/FadeIn";
import HeroImage from "../components/HeroImage";
import HomeText from "../components/HomeText";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <FadeIn>
      <div className={styles.pageContainer}>
        <Head>
          <title>Med Suite - Visa Sponsored Jobs for African Nurses</title>
        </Head>
        <Navbar />
        <section className={styles.container}>
          <HomeText />
          <HeroImage />
        </section>
      </div>
    </FadeIn>
  );
};

export default Home;
