import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../reducer/Reducer";
import userReducer from "../reducer/Userslice";
import contentSlice from "../reducer/CartSlice";
export default configureStore({
  reducer: {
    counter: counterSlice,
    Profile: userReducer,
    content: contentSlice,
  },
});
