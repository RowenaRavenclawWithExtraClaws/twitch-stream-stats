import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    streams: { data: [], page_count: 11 },
  },
};

export const viewersPerGameSlice = createSlice({
  name: "viewersPerGame",
  initialState,
  reducers: {
    setViewersPerGame: (state, action) => {
      state.value.streams = action.payload;
    },
  },
});

export const { setViewersPerGame } = viewersPerGameSlice.actions;

export const selectViewersPerGame = (state) =>
  state.viewersPerGame.value.streams;

export default viewersPerGameSlice.reducer;
