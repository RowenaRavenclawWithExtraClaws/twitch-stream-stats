import type { NextPage } from "next";
import {
  Grid,
  Container,
  Card,
  CardContent,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import CustomFooter from "../components/customFooter";
import CustomHeader from "../components/customHeader";
import styles from "../styles/Home.module.css";
import { Table } from "reactstrap";
import StatsCard from "../components/statsCard";

const Home: NextPage = () => {
  const stats = [
    {
      title: "Top streams per game",
      data: [{ game_name: "Minecraft", stream_count: 10 }],
    },
    {
      title: "Highest viewers per game",
      data: [{ game_name: "Fifa 22", viewer_count: 89002 }],
    },
    {
      title: "Streams with odd no. of viewers",
      data: [{ title: "Im playing NBA 2k, just hop in", viewer_count: 8091 }],
    },
    {
      title: "Streams with even no. of viewers",
      data: [{ title: "Im playing Fifa 22, just hop in", viewer_count: 12590 }],
    },
    {
      title: "Streams with the same no. of viewers",
      data: [{ title: "Im playing NBA 2k, just hop in", viewer_count: 8091 }],
    },
  ];

  return (
    <Container maxWidth="xl" className={styles.container}>
      <CustomHeader title="Stream Stats" />
      <main className={styles.main}>
        <h1 className={styles.title}>Stream Insights</h1>
        <Grid container spacing={2}>
          {stats.map((info, indx) => (
            <Grid key={indx} item lg={4}>
              <StatsCard title={info.title} data={info.data} />
            </Grid>
          ))}
        </Grid>
      </main>
      <CustomFooter />
    </Container>
  );
};

export default Home;
