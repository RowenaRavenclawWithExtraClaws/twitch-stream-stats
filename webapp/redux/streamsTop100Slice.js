import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    streams: { data: [], page_count: 6 },
  },
};

export const streamsTop100Slice = createSlice({
  name: "streamsTop100",
  initialState,
  reducers: {
    setStreamsTop100: (state, action) => {
      state.value.streams = action.payload;
    },
  },
});

export const { setStreamsTop100 } = streamsTop100Slice.actions;

export const selectStreamsTop100 = (state) => state.streamsTop100.value.streams;

export default streamsTop100Slice.reducer;
