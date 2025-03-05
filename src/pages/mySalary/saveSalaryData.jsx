import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export const saveSalaryData = async (userId, salaryData) => {
  try {
    // 월별로 데이터를 저장
    for (const month in salaryData) {
      const salaryForMonth = salaryData[month];
      await setDoc(
        doc(db, "salaries", userId, "months", month),
        salaryForMonth
      );
      console.log(`${month} 급여 데이터가 성공적으로 저장되었습니다.`);
    }
  } catch (error) {
    console.error("급여 데이터 저장에 실패했습니다:", error);
  }
};
