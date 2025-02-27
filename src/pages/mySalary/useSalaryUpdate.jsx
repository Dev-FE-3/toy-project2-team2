import { useEffect } from "react";
import { auth } from "../../firebase";
import { saveSalaryData } from "./saveSalaryData";

const useSalaryUpdate = () => {
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return; // 유저 정보가 없으면 아무 작업도 안 함

    const salaryInput = {
      year: 2025,
      month: 2,
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
    };

    const totalPayment = Object.values(salaryInput.payments).reduce(
      (acc, val) => acc + val,
      0
    );
    const totalDeduction = Object.values(salaryInput.deductions).reduce(
      (acc, val) => acc + val,
      0
    );
    const netSalary = totalPayment - totalDeduction;

    const finalData = {
      ...salaryInput,
      totalPayment,
      totalDeduction,
      netSalary,
    };

    saveSalaryData(user.uid, finalData).then(() => {
      console.log("✅ 업데이트가 완료되었습니다!");
    });
  }, [user]);
};

export default useSalaryUpdate;
