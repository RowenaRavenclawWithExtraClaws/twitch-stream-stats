import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    streams: {},
  },
};

export const streamsPerGameSlice = createSlice({
  name: "streams",
  initialState,
  reducers: {
    setStreamsPerGame: (state, action) => {
      state.value.streams = action.payload;
    },
  },
});

export const { setStreamsPerGame } = streamsPerGameSlice.actions;

export const selectStreamsPerGame = (state) => state.streams.value.streams;

export default streamsPerGameSlice.reducer;
