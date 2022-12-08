import Head from "next/head";
import HeroImage from "../components/HeroImage";
import HomeText from "../components/HomeText";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css"

const Home = () => {
  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>Med Suite - Visa Sponsored Jobs for Nigerian Nurses</title>
      </Head>
      <Navbar />
      <section className={styles.container}>
        <HomeText />
        <HeroImage />
      </section>
    </div>
  );
};

export default Home;
