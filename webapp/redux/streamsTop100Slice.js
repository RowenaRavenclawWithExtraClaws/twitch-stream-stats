import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    streams: {},
  },
};

export const streamsTop100Slice = createSlice({
  name: "streamstop",
  initialState,
  reducers: {
    setStreamsTop100: (state, action) => {
      state.value.streams = action.payload;
    },
  },
});

export const { setStreamsTop100 } = streamsTop100Slice.actions;

export const selectStreamsTop100 = (state) => state.streamstop.value.streams;

export default streamsTop100Slice.reducer;
