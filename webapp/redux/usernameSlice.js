import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: "",
  },
};

export const usernameSlice = createSlice({
  name: "username",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.value.username = action.payload;
    },
  },
});

export const { setUsername } = usernameSlice.actions;

export const selectUsername = (state) => state.username.value.username;

export default usernameSlice.reducer;
