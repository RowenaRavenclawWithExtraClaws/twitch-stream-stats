import type { NextPage } from "next";
import CustomFooter from "../components/customFooter";
import CustomHeader from "../components/customHeader";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <CustomHeader title="Stream Stats" />

      <main className={styles.main}>
        <h1 className={styles.title}>Stream Insights</h1>
      </main>

      <CustomFooter />
    </div>
  );
};

export default Home;
