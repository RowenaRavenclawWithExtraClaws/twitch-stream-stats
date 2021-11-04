import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    streams: {},
  },
};

export const streamsEvenViewersSlice = createSlice({
  name: "streamsevenviewers",
  initialState,
  reducers: {
    setStreamsEvenViewersSlice: (state, action) => {
      state.value.streams = action.payload;
    },
  },
});

export const { setStreamsEvenViewersSlice } = streamsEvenViewersSlice.actions;

export const selectStreamsEvenViewers = (state) =>
  state.streamsevenviewers.value.streams;

export default streamsEvenViewersSlice.reducer;
