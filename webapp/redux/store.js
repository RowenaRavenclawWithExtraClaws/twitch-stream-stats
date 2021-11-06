import { configureStore } from "@reduxjs/toolkit";
import usernameReducer from "./usernameSlice";
import streamsPerGameReducer from "./streamsPerGameSlice";
import viewersPerGameReducer from "./viewersPerGameSlice";
import medianViewersReducer from "./medianViewersSlice";
import streamsOddViewersReducer from "./streamsOddViewersSlice";
import streamsEvenViewersReducer from "./streamsEvenViewersSlice";
import streamsTop100Reducer from "./streamsTop100Slice";
import streamsSameViewersReducer from "./streamsSameViewersSlice";

const store = configureStore({
  reducer: {
    username: usernameReducer,
    streamsPerGame: streamsPerGameReducer,
    viewersPerGame: viewersPerGameReducer,
    medianViewers: medianViewersReducer,
    streamsOddViewers: streamsOddViewersReducer,
    streamsEvenViewers: streamsEvenViewersReducer,
    streamsTop100: streamsTop100Reducer,
    streamsSameViewers: streamsSameViewersReducer,
  },
});

export default store;
