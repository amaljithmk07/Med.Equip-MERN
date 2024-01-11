import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../reducer/Reducer";
export default configureStore({
  reducer: {
    counterSlice,
  },
});
