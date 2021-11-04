import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    streams: {},
  },
};

export const viewersPerGameSlice = createSlice({
  name: "streamsviews",
  initialState,
  reducers: {
    setViewersPerGame: (state, action) => {
      state.value.streams = action.payload;
    },
  },
});

export const { setViewersPerGame } = viewersPerGameSlice.actions;

export const selectViewersPerGame = (state) => state.streamsviews.value.streams;

export default viewersPerGameSlice.reducer;
