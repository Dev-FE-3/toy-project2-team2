import { Timestamp } from "firebase/firestore";

const formatHiredDate = (hiredDate) => {
  if (!hiredDate) return "입사일 없음";

  if (hiredDate instanceof Timestamp) {
    return new Date(hiredDate.seconds * 1000).toISOString().split("T")[0];
  }

  return new Date(hiredDate).toISOString().split("T")[0];
};

export default formatHiredDate;
