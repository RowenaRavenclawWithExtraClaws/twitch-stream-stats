import type { NextPage } from "next";
import { Button, Container } from "@mui/material";
import { Icon } from "@iconify/react";
import CustomFooter from "../components/customFooter";
import CustomHeader from "../components/customHeader";

const Signin: NextPage = () => {
  const redirectURL =
    process.env.NODE_ENV === ("development" as typeof process.env.NODE_ENV)
      ? "http://localhost:3000"
      : "https://stream-stats.vercel.app";

  return (
    <Container className="container">
      <CustomHeader title="Stream Stats | Sign in" />

      <main className="main">
        <h1 className="title">Welcome to Stream Stats!</h1>

        <p className="description">
          Get started by signing in to your Twitch account
        </p>

        <a
          href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=dejhj47nm5nunxeavvfvhphi7us45o&redirect_uri=${redirectURL}&scope=user:read:email&force_verify=true`}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<Icon icon="la:twitch" />}
            className="twitchbut"
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
