import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    streams: { data: [], page_count: 15 },
  },
};

export const streamsPerGameSlice = createSlice({
  name: "streamsPerGame",
  initialState,
  reducers: {
    setStreamsPerGame: (state, action) => {
      state.value.streams = action.payload;
    },
  },
});

export const { setStreamsPerGame } = streamsPerGameSlice.actions;

export const selectStreamsPerGame = (state) =>
  state.streamsPerGame.value.streams;

export default streamsPerGameSlice.reducer;
