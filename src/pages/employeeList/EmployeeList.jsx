import styled from "styled-components";
import PageTitle from "../../shared/components/PageTitle";
import Input from "../../shared/components/Input";
import { useState } from "react";
import { useEmployees } from "./hooks/useEmployees";
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
  position: absolute; // 이미지가 입력창을 밀지 않도록
  right: 10px;
  visibility: ${(props) =>
    props.visible
      ? "visible"
      : "hidden"}; // visible prop으로 이미지 보이게 설정
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
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const { employees, fetchEmployees } = useEmployees(); // 커스텀 훅 사용
  const navigate = useNavigate();

  // 검색 핸들러 (Enter 입력 시 실행)
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      if (searchTerm === "") {
        // 검색어가 비어 있으면 전체 리스트
        fetchEmployees();
      } else {
        const filtered = employees.filter(
          (emp) =>
            (emp.name && emp.name.includes(searchTerm)) ||
            (emp.employeeId && emp.employeeId.toString().includes(searchTerm))
        );
        // 검색어에 맞는 필터링된 데이터로 업데이트
        fetchEmployees(filtered);
      }
    }
  };

  // 검색어 변경 시 필터링된 결과 처리
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      fetchEmployees(); // 검색어가 비어 있으면 전체 직원 목록을 다시 불러옴
    }
  };

  const resetSearch = () => {
    setSearchTerm(""); // 검색어 초기화
    fetchEmployees(); // 전체 직원 목록을 다시 불러옴
  };

  const handleRowClick = (employeeId) => {
    navigate(`/Salary/${employeeId}`);
  };

  return (
    <>
      <TitleContainer>
        <PageTitle title="급여 확인" subtitle="직원 리스트" />
        <SearchContainer>
          <Input
            id="search"
            label="검색 :"
            placeholder="이름 또는 사번으로 검색"
            value={searchTerm}
            onChange={handleInputChange} // 검색어 변경 시 호출
            onKeyDown={handleSearch} // Enter 입력 시 실행
          />
          {searchTerm && (
            <ResetImgStyle
              src={ResetImg}
              alt="reset search"
              visible={searchTerm !== ""}
              onClick={resetSearch}
            />
          )}
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
          {employees.length > 0 ? (
            employees.map((employee) => (
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
