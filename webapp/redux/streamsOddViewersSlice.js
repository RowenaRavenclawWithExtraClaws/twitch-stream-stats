import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    streams: {},
  },
};

export const streamsOddViewersSlice = createSlice({
  name: "streamsoddviewers",
  initialState,
  reducers: {
    setStreamsOddViewersSlice: (state, action) => {
      state.value.streams = action.payload;
    },
  },
});

export const { setStreamsOddViewersSlice } = streamsOddViewersSlice.actions;

export const selectStreamsOddViewers = (state) =>
  state.streamsoddviewers.value.streams;

export default streamsOddViewersSlice.reducer;
