import type { NextPage } from "next";
import { Grid, Container } from "@mui/material";
import CustomFooter from "../components/customFooter";
import CustomHeader from "../components/customHeader";
import styles from "../styles/Home.module.css";
import StatsCard from "../components/statsCard";
import { useSelector } from "react-redux";
import { selectStreamsPerGame } from "../redux/streamsPerGameSlice";
import { selectViewersPerGame } from "../redux/viewersPerGameSlice";
import { selectStreamsOddViewers } from "../redux/streamsOddViewersSlice";
import { selectStreamsEvenViewers } from "../redux/streamsEvenViewersSlice";
import { selectStreamsTop100 } from "../redux/streamsTop100Slice";
import { selectStreamsSameViewers } from "../redux/streamsSameViewersSlice";
import ProfileMenu from "../components/profileMenu";

const Home: NextPage = () => {
  const streamsPerGame = useSelector(selectStreamsPerGame);
  const viewersPerGame = useSelector(selectViewersPerGame);
  const streamsOddViewers = useSelector(selectStreamsOddViewers);
  const streamsEvenViewers = useSelector(selectStreamsEvenViewers);
  const streamsTop100 = useSelector(selectStreamsTop100);
  const streamsSameViewers = useSelector(selectStreamsSameViewers);

  const stats = [
    {
      title: "Top streams per game",
      data: streamsPerGame.data,
      pageCount: streamsPerGame.page_count,
    },
    {
      title: "Highest viewers per game",
      data: viewersPerGame.data,
      pageCount: viewersPerGame.page_count,
    },
    {
      title: "Streams with odd no. of viewers",
      data: streamsOddViewers.data,
      pageCount: streamsOddViewers.page_count,
    },
    {
      title: "Streams with even no. of viewers",
      data: streamsEvenViewers.data,
      pageCount: streamsEvenViewers.page_count,
    },
    {
      title: "Streams with the same no. of viewers",
      data: streamsSameViewers.data,
      pageCount: streamsSameViewers.page_count,
    },
    {
      title: "Top 100 streams",
      data: streamsTop100.data,
      pageCount: streamsTop100.page_count,
    },
  ];

  return (
    <Container maxWidth="xl" className={styles.container}>
      <CustomHeader title="Stream Stats" />
      <main className={styles.main}>
        <div style={{ width: "100%" }}>
          <h1 className={styles.title}>Stream Insights</h1>
          <ProfileMenu />
        </div>
        <Grid container spacing={2}>
          {stats.map((info, indx) => (
            <Grid key={indx} item lg={4}>
              <StatsCard
                title={info.title}
                data={info.data}
                pageCount={info.pageCount}
              />
            </Grid>
          ))}
        </Grid>
      </main>
      <CustomFooter />
    </Container>
  );
};

export default Home;
