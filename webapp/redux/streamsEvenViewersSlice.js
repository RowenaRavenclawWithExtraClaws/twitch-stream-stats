import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    streams: { data: [], page_count: 17 },
  },
};

export const streamsEvenViewersSlice = createSlice({
  name: "streamsEvenViewers",
  initialState,
  reducers: {
    setStreamsEvenViewers: (state, action) => {
      state.value.streams = action.payload;
    },
  },
});

export const { setStreamsEvenViewers } = streamsEvenViewersSlice.actions;

export const selectStreamsEvenViewers = (state) =>
  state.streamsEvenViewers.value.streams;

export default streamsEvenViewersSlice.reducer;
