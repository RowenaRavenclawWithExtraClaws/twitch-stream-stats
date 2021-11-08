import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { Grid, Container, Chip } from "@mui/material";
import CustomFooter from "../components/customFooter";
import CustomHeader from "../components/customHeader";
import styles from "../styles/Home.module.css";
import StatsCard from "../components/statsCard";
import { selectStreamsPerGame } from "../redux/streamsPerGameSlice";
import { selectViewersPerGame } from "../redux/viewersPerGameSlice";
import { selectStreamsOddViewers } from "../redux/streamsOddViewersSlice";
import { selectStreamsEvenViewers } from "../redux/streamsEvenViewersSlice";
import { selectStreamsTop100 } from "../redux/streamsTop100Slice";
import { selectStreamsSameViewers } from "../redux/streamsSameViewersSlice";
import ProfileMenu from "../components/profileMenu";
import { customFetch, endpoints, isAuthUser } from "../utility";
import FetchIndicator from "../components/fetchIndicator";
import {
  selectMedianViewers,
  setMedianViewers,
} from "../redux/medianViewersSlice";

const Home: NextPage = () => {
  const streamsPerGame = useSelector(selectStreamsPerGame);
  const viewersPerGame = useSelector(selectViewersPerGame);
  const streamsOddViewers = useSelector(selectStreamsOddViewers);
  const streamsEvenViewers = useSelector(selectStreamsEvenViewers);
  const streamsTop100 = useSelector(selectStreamsTop100);
  const streamsSameViewers = useSelector(selectStreamsSameViewers);
  const medianViewers = useSelector(selectMedianViewers);

  const [fetching, toggleFetching] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    isAuthUser(document.location.hash, dispatch).then((isAuthed) => {
      if (isAuthed) {
        Promise.all([
          ...endpoints.map((endpoint) =>
            customFetch(endpoint.endpoint, { page: 1 }, (body) =>
              dispatch(endpoint.setter(body))
            )
          ),
          customFetch("median-viewers", {}, (body) =>
            dispatch(setMedianViewers(body))
          ),
        ]).then(() => toggleFetching(false));
      } else router.replace("/signin");
    });
  }, []);

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

  if (fetching) return <FetchIndicator />;

  return (
    <Container maxWidth="xl" className={styles.container}>
      <CustomHeader title="Stream Stats" />
      <main className={styles.main}>
        <div style={{ width: "100%" }}>
          <div style={{ display: "inline-block" }}>
            <h1 className={styles.title}>Stream Insights</h1>
            <p>Median of viewers (~ 1k streams) </p>
            <Chip label={medianViewers.data} color="success"></Chip>
          </div>
          <ProfileMenu />
        </div>
        <Grid container spacing={2}>
          {stats.map((info, indx) => (
            <Grid key={indx} item lg={6}>
              <StatsCard
                title={info.title}
                data={info.data}
                pageCount={info.pageCount}
                endpoint={endpoints[indx].endpoint}
                setter={endpoints[indx].setter}
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
