import { useEffect } from "react";
import { db, auth } from "../../shared/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const useSalaryUpdate = () => {
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return; // 유저 정보가 없으면 아무 작업도 안 함

    const salaryInput = {
      "2025년 2월": {
        payments: {
          baseSalary: 3500000,
          overtimePay: 100000,
          mealAllowance: 100000,
        },
        deductions: {
          pension: 100000,
          healthInsurance: 100000,
          employmentInsurance: 100000,
          incomeTax: 250000,
          localIncomeTax: 50000,
        },
      },
      "2025년 1월": {
        payments: {
          baseSalary: 3550000,
          overtimePay: 120000,
          mealAllowance: 110000,
        },
        deductions: {
          pension: 105000,
          healthInsurance: 105000,
          employmentInsurance: 105000,
          incomeTax: 260000,
          localIncomeTax: 52000,
        },
      },
      // 추가적인 월별 데이터...
    };

    Object.keys(salaryInput).forEach(async (month) => {
      const monthData = salaryInput[month];
      const totalPayment = Object.values(monthData.payments).reduce(
        (acc, val) => acc + val,
        0
      );
      const totalDeduction = Object.values(monthData.deductions).reduce(
        (acc, val) => acc + val,
        0
      );
      const netSalary = totalPayment - totalDeduction;

      const finalData = {
        ...monthData,
        totalPayment,
        totalDeduction,
        netSalary,
      };

      try {
        // 월별 데이터 저장: "salaries/{userId}/months/{month}"
        const userDocRef = doc(db, "salaries", user.uid, "months", month);
        await setDoc(userDocRef, finalData);
        //console.log(`✅ ${month} 급여 데이터가 성공적으로 저장되었습니다!`);
      } catch (error) {
        console.error("급여 데이터 저장에 실패했습니다:", error);
      }
    });
  }, [user]);
};

export default useSalaryUpdate;
