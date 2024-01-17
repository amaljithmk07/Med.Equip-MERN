import { createSlice } from "@reduxjs/toolkit";
export const profileSlice = createSlice({
  name: "Profile",
  initialState: {
    profileState: "Amaljith M K",
  },
  reducers: {
    display: (state) => {},
  },
});
export const { display } = profileSlice.actions;
export default profileSlice.reducer;
