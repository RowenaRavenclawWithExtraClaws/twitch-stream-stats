import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    streams: { data: [], page_count: 1 },
  },
};

export const streamsSameViewersSlice = createSlice({
  name: "streamsSameViewers",
  initialState,
  reducers: {
    setStreamsSameViewers: (state, action) => {
      state.value.streams = action.payload;
    },
  },
});

export const { setStreamsSameViewers } = streamsSameViewersSlice.actions;

export const selectStreamsSameViewers = (state) =>
  state.streamsSameViewers.value.streams;

export default streamsSameViewersSlice.reducer;
