import type { NextPage } from "next";
import { Button } from "@mui/material";
import { Icon } from "@iconify/react";
import CustomFooter from "../components/customFooter";
import CustomHeader from "../components/customHeader";
import styles from "../styles/Home.module.css";

const Signin: NextPage = () => {
  return (
    <div className={styles.container}>
      <CustomHeader title="Stream Stats | Sign in" />

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Stream Stats!</h1>

        <p className={styles.description}>
          Get started by signing in to your Twitch account
        </p>

        <Button
          variant="contained"
          size="large"
          startIcon={<Icon icon="la:twitch" />}
          className={styles.twitchbut}
        >
          Sign in with Twitch.tv
        </Button>
      </main>

      <CustomFooter />
    </div>
  );
};

export default Signin;
