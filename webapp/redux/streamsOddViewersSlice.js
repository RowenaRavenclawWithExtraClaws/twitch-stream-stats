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
    setStreamsOddViewersSlice: (state, action) => {
      state.value.streams = action.payload;
    },
  },
});

export const { setStreamsOddViewersSlice } = streamsOddViewersSlice.actions;

export const selectStreamsOddViewers = (state) =>
  state.streamsOddViewers.value.streams;

export default streamsOddViewersSlice.reducer;
