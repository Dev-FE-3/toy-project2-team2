// import { useState, useEffect } from "react";
// import { db } from "../../../shared/firebase";
// import { collection, getDocs } from "firebase/firestore";

// export const useEmployees = () => {
//   const [employees, setEmployees] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // 직원 데이터를 가져오는 함수
//   const fetchEmployees = async (filteredData = null) => {
//     setIsLoading(true); // 로딩 추가!
//     try {
//       const querySnapshot = await getDocs(collection(db, "users"));
//       const employeeData = querySnapshot.docs
//         .map((doc) => {
//           const data = doc.data();
//           return {
//             id: doc.id,
//             ...data,
//             formattedHiredDate: data.hiredDate?.seconds
//               ? new Date(data.hiredDate.seconds * 1000)
//                   .toISOString()
//                   .split("T")[0]
//               : "입사일 없음",
//           };
//         })
//         .sort((a, b) => a.name.localeCompare(b.name)); // 가나다 정렬 넣을지 뺄지 고민

//       if (filteredData) {
//         setEmployees(filteredData); // 필터링된 데이터로 업데이트
//       } else {
//         setEmployees(employeeData); // 모든 직원 목록 업데이트
//       }
//     } catch (error) {
//       console.error("직원 데이터를 가져오는 중 오류 발생:", error);
//     } finally {
//       setIsLoading(false); // 로딩 종료
//     }
//   };

//   // 최초 렌더링 시 모든 직원 목록을 가져옴
//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   return {
//     employees,
//     isLoading,
//     fetchEmployees,
//   };
// };

import { useState, useEffect } from "react";
import { db } from "../../../shared/firebase";
import { collection, getDocs } from "firebase/firestore";

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]); // 모든 직원 목록
  const [filteredEmployees, setFilteredEmployees] = useState([]); // 필터링된 직원 목록
  const [isLoading, setIsLoading] = useState(false);

  // 직원 데이터를 가져오는 함수
  const fetchEmployees = async () => {
    setIsLoading(true); // 로딩 상태 시작
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
        .sort((a, b) => a.name.localeCompare(b.name)); // 가나다 정렬

      setEmployees(employeeData); // 모든 직원 목록 업데이트
      setFilteredEmployees(employeeData); // 초기 필터링된 데이터도 동일하게 설정
    } catch (error) {
      console.error("직원 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  // 최초 렌더링 시 모든 직원 목록을 가져옴
  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    filteredEmployees,
    isLoading,
    fetchEmployees,
    setFilteredEmployees, // 필터링된 직원 목록을 설정하는 함수 추가
  };
};
