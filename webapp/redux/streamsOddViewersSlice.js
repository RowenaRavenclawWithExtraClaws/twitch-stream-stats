import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    streams: { data: [], page_count: 7 },
  },
};

export const streamsOddViewersSlice = createSlice({
  name: "streamsOddViewers",
  initialState,
  reducers: {
    setStreamsOddViewers: (state, action) => {
      state.value.streams = action.payload;
    },
  },
});

export const { setStreamsOddViewers } = streamsOddViewersSlice.actions;

export const selectStreamsOddViewers = (state) =>
  state.streamsOddViewers.value.streams;

export default streamsOddViewersSlice.reducer;
