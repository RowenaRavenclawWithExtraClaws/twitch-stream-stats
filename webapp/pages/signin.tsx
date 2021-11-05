import type { NextPage } from "next";
import { Button, Container } from "@mui/material";
import { Icon } from "@iconify/react";
import CustomFooter from "../components/customFooter";
import CustomHeader from "../components/customHeader";
import styles from "../styles/Home.module.css";

const Signin: NextPage = () => {
  return (
    <Container className={styles.container}>
      <CustomHeader title="Stream Stats | Sign in" />

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Stream Stats!</h1>

        <p className={styles.description}>
          Get started by signing in to your Twitch account
        </p>

        <a
          href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=dejhj47nm5nunxeavvfvhphi7us45o&redirect_uri=http://localhost:3000&scope=user:read:email&force_verify=true`}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<Icon icon="la:twitch" />}
            className={styles.twitchbut}
          >
            Sign in with Twitch.tv
          </Button>
        </a>
      </main>

      <CustomFooter />
    </Container>
  );
};

export default Signin;
