import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    streams: {},
  },
};

export const streamsSameViewersSlice = createSlice({
  name: "streamssameviewers",
  initialState,
  reducers: {
    setStreamsSameViewersSlice: (state, action) => {
      state.value.streams = action.payload;
    },
  },
});

export const { setStreamsSameViewersSlice } = streamsSameViewersSlice.actions;

export const selectStreamsSameViewers = (state) =>
  state.streamssameviewers.value.streams;

export default streamsSameViewersSlice.reducer;
