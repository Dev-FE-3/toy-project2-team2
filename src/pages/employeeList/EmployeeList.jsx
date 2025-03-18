import styled from "styled-components";
import PageTitle from "../../shared/components/PageTitle";
import Input from "../../shared/components/Input";
import { useState, useCallback, useEffect } from "react";
import { useEmployees } from "./hooks/useEmployees";
import ResetImg from "/images/reset.svg";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

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
  visibility: ${(props) => (props.visible ? "block" : "none")};
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
      background-color: var(--background-color-3);
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
  const { employees, filteredEmployees, isLoading, setFilteredEmployees } =
    useEmployees();
  const navigate = useNavigate();

  // 디바운스된 검색 함수
  const debouncedSearch = useCallback(
    debounce((term) => {
      if (term === "") {
        setFilteredEmployees(employees); // 검색어가 비어 있으면 전체 직원 목록
      } else {
        const filtered = employees.filter(
          ({ name, employeeId }) =>
            (name && name.includes(term)) ||
            (employeeId && employeeId.toString().includes(term))
        );
        setFilteredEmployees(filtered); // 필터링된 데이터로 상태 업데이트
      }
    }, 300),
    [employees, setFilteredEmployees] // `employees`와 `setFilteredEmployees` 의존성 추가
  );

  // 검색어 변경 시 디바운스 적용
  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    debouncedSearch(value); // 디바운스된 함수 호출
  };

  // 검색 리셋
  const resetSearch = () => {
    setSearchTerm(""); // 검색어 초기화
    setFilteredEmployees(employees); // 전체 직원 목록을 다시 표시
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
          />
          {searchTerm && (
            <ResetImgStyle
              src={ResetImg}
              alt="reset search"
              $visible={searchTerm !== ""}
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
          {isLoading ? (
            <tr>
              <td colSpan="5">로딩 중...</td>
            </tr>
          ) : filteredEmployees.length > 0 ? (
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
