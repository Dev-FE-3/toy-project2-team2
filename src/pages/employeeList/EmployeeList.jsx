import styled from "styled-components";
import PageTitle from "../../shared/components/PageTitle";
import Input from "../../shared/components/Input";
import { useState, useEffect } from "react";
import { db } from "../../shared/firebase";
import { collection, getDocs, Timestamp, doc } from "firebase/firestore";
import ResetImg from "/images/reset.svg";
import { useNavigate } from "react-router-dom";

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ResetImgStyle = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  margin-top: 45px;
  margin-bottom: 138px;
  text-align: center;
  font-size: var(--font-size-title-small);
  border-spacing: 10px;
  border-top: 2px solid var(--background-color);
  border-bottom: 2px solid var(--background-color);

  thead {
    display: table;
    table-layout: fixed;
    width: 100%;
    font-weight: 700;
    border-bottom: 2px solid var(--background-color);

    &::after {
      content: "";
      display: block;
      height: 10px;
    }

    tr {
      border-bottom: 2px solid var(--background-color);

      th {
        color: var(--text-secondary);
      }
    }
  }

  tbody {
    display: block;
    max-height: 480px;
    overflow-y: scroll;
    :hover {
      background-color: var(--background-color);
      cursor: pointer;
    }

    tr {
      display: table;
      width: 100%;
      table-layout: fixed;

      td {
        color: var(--text-primary);
      }
    }
  }

  th,
  td {
    width: 20%;
    padding: 24px;
  }
`;

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [filteredEmployees, setFilteredEmployees] = useState([]); // 필터링된 직원 목록
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
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
        setEmployees(employeeData);
        setFilteredEmployees(employeeData); // 초기 필터 데이터 설정
      } catch (error) {
        console.error("직원 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchEmployees();
  }, []);

  // 검색 핸들러 (Enter 입력 시 실행 - 컴포넌트도 수정!!)
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const filtered = employees.filter(
        (emp) =>
          (emp.name && emp.name.includes(searchTerm)) || // 이름 포함 여부
          (emp.employeeId && emp.employeeId.toString().includes(searchTerm)) // 사번 포함 여부 (문자열로 변환)
      );
      setFilteredEmployees(filtered);
    }
  };

  const resetSearch = () => {
    setSearchTerm(""); // 검색어 초기화
    setFilteredEmployees(employees); // 필터 초기화 (전체 직원 리스트로 복구)
  };

  const handleRowClick = (employeeId) => {
    navigate(`/MySalary/${employeeId}`);
  };

  return (
    <>
      <TitleContainer>
        <PageTitle title="급여 확인" subtitle="직원 리스트" />
        <SearchContainer>
          {searchTerm && (
            <ResetImgStyle
              src={ResetImg}
              alt="reset search"
              onClick={resetSearch}
            />
          )}

          <Input
            id="search"
            label="검색 :"
            placeholder="이름 또는 사번으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch} // Enter 입력 감지
          />
        </SearchContainer>
      </TitleContainer>
      <Table>
        <thead>
          <tr>
            <th>이름</th>
            <th>사번</th>
            <th>근무 지점</th>
            <th>직급</th>
            <th>입사일</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr
                key={employee.id}
                onClick={() => handleRowClick(employee.employeeId)}
              >
                <td>{employee.name}</td>
                <td>{employee.employeeId}</td>
                <td>{employee.location}</td>
                <td>{employee.position}</td>
                <td>{employee.formattedHiredDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">검색 결과가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default EmployeeList;
