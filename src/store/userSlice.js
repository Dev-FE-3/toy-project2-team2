import { createSlice } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore"; // Timestamp import

const initialState = {
  userInfo: {
    uid: "",
    employeeId: "",
    name: "",
    hiredDate: "",
    location: "",
    position: "",
  },
};

// slice 정의
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const payload = action.payload;

      // _Timestamp를 ISO 문자열로 변환하여 상태에 저장
      if (payload.hiredDate instanceof Timestamp) {
        payload.hiredDate = new Date(
          payload.hiredDate.seconds * 1000
        ).toISOString();
      }

      state.userInfo = payload;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
  },
});

export const { setUserInfo, updateUserInfo } = userSlice.actions;
export const selectUserInfo = (state) => state.user.userInfo;
export default userSlice.reducer;
