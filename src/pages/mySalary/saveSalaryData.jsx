import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export const saveSalaryData = async (userId, salaryData) => {
  try {
    // Firestore에서 해당 userId로 문서를 생성하거나 업데이트
    await setDoc(doc(db, "salaries", userId), salaryData);
    console.log("급여 데이터가 성공적으로 저장되었습니다.");
  } catch (error) {
    console.error("급여 데이터 저장에 실패했습니다:", error);
  }
};
