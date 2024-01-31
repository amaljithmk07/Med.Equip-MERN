import { configureStore } from "@reduxjs/toolkit";
import contentSlice from "../reducer/CartSlice";
export default configureStore({
  reducer: {
    content: contentSlice,
  },
});
