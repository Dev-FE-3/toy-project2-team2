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

        // "YYYY년 MM월" -> Date 객체로 변환하여 정렬
        const sortedMonths = availableMonths
          .map((month) => {
            const match = month.match(/(\d{4})년 (\d{1,2})월/);
            if (!match) return { date: new Date(0), original: month }; // 포맷이 잘못된 경우 방어 코드
            const [_, year, monthNum] = match;
            return {
              date: new Date(parseInt(year), parseInt(monthNum) - 1),
              original: month,
            };
          })
          .sort((a, b) => b.date - a.date) // 최신순 정렬
          .map((item) => item.original) // 원래 문자열 포맷 유지
          .slice(0, 12); // 최신 12개월만 선택

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
