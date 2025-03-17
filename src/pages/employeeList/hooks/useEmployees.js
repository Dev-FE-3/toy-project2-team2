import { useState, useEffect } from "react";
import { db } from "../../../shared/firebase";
import { collection, getDocs } from "firebase/firestore";

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);

  // 직원 데이터를 가져오는 함수
  const fetchEmployees = async (filteredData = null) => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const employeeData = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            formattedHiredDate: data.hiredDate?.seconds
              ? new Date(data.hiredDate.seconds * 1000)
                  .toISOString()
                  .split("T")[0]
              : "입사일 없음",
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name)); // 가나다 정렬 넣을지 뺄지 고민

      if (filteredData) {
        setEmployees(filteredData); // 필터링된 데이터로 업데이트
      } else {
        setEmployees(employeeData); // 모든 직원 목록 업데이트
      }
    } catch (error) {
      console.error("직원 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  // 최초 렌더링 시 모든 직원 목록을 가져옴
  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    fetchEmployees,
  };
};
