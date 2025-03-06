import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // userSlice.js에서 reducer를 가져옴

const store = configureStore({
  reducer: {
    user: userReducer, // store에 user 상태 등록
  },
});

export default store;
