import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../shared/firebase";

const useAvailableMonths = (userId) => {
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchMonths = async () => {
      setLoading(true);
      try {
        const monthsRef = collection(db, "salaries", userId, "months");
        const snapshot = await getDocs(monthsRef);
        const availableMonths = snapshot.docs.map((doc) => doc.id);

        // 최신 12개월 정렬
        const sortedMonths = availableMonths
          .sort((a, b) => {
            return (
              new Date(b.replace(/년 |월/g, "")) -
              new Date(a.replace(/년 |월/g, ""))
            );
          })
          .slice(0, 12);

        setMonths(sortedMonths);
        setSelectedMonth(sortedMonths[0] || ""); // 최신 월을 기본 선택
      } catch (error) {
        console.error("Error fetching available months:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonths();
  }, [userId]);

  return { months, selectedMonth, setSelectedMonth, loading };
};

export default useAvailableMonths;
