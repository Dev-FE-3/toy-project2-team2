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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const payload = action.payload; // action에서 전달된 사용자 정보

      // _Timestamp를 ISO 문자열로 변환하여 상태에 저장 - JavaScript Date 객체로 변환해야 하기 때문에 변환 작업이 필요합니다..
      if (payload.hiredDate instanceof Timestamp) {
        payload.hiredDate = new Date(
          payload.hiredDate.seconds * 1000
        ).toISOString();
      }
      // 변환한 정보를 상태에 저장
      state.userInfo = payload;
    },
    updateUserInfo: (state, action) => {
      // 기존 userInfo에 action.payload에 전달된 새로운 값을 병합
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
  },
});

export const { setUserInfo, updateUserInfo } = userSlice.actions;
export const selectUserInfo = (state) => state.user.userInfo;
export default userSlice.reducer;
