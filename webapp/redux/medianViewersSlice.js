import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    median: 0,
  },
};

export const medianViewersSlice = createSlice({
  name: "medianViewers",
  initialState,
  reducers: {
    setMedianViewers: (state, action) => {
      state.value.median = action.payload;
    },
  },
});

export const { setMedianViewers } = medianViewersSlice.actions;

export const selectMedianViewers = (state) => state.medianViewers.value.median;

export default medianViewersSlice.reducer;
