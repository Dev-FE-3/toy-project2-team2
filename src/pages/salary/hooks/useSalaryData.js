import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../shared/firebase";

const useSalaryData = (userId, month) => {
  const [salaryData, setSalaryData] = useState({
    netSalary: 0,
    payments: [],
    deductions: [],
  });
  const [isLoadingSalaryData, setLoading] = useState(false);

  useEffect(() => {
    if (!userId || !month) return;

    const fetchSalaryData = async () => {
      setLoading(true);
      try {
        const salaryRef = doc(db, "salaries", userId, "months", month);
        const snapshot = await getDoc(salaryRef);
        setSalaryData(
          snapshot.exists()
            ? snapshot.data()
            : { netSalary: 0, payments: [], deductions: [] }
        );
      } catch (error) {
        console.error("Error fetching salary data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalaryData();
  }, [userId, month]);

  const updateSalaryData = async (newData) => {
    if (!userId || !month) return;

    try {
      const salaryRef = doc(db, "salaries", userId, "months", month);
      await updateDoc(salaryRef, newData);
      setSalaryData((prev) => ({ ...prev, ...newData }));
    } catch (error) {
      console.error("Error updating salary data:", error);
    }
  };

  return { salaryData, isLoadingSalaryData, updateSalaryData };
};

export default useSalaryData;
