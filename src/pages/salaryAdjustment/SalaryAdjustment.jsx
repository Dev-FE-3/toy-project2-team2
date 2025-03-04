import PageTitle from "../../shared/components/titles/PageTitle";
import styled from "styled-components";
import Button from "../../shared/components/button/Button";

const TitleContainer = styled.div`
  position: relative;

  button {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  margin-top: 45px;
  margin-bottom: 138px;
`;

const HeaderTable = styled.table`
  width: 100%;
  text-align: center;
  color: var(--text-secondary);
  font-size: var(--font-size-title-small);
  font-weight: 500;
  table-layout: fixed;
  border-spacing: 0;
  border-collapse: separate;

  th {
    padding: 24px 0;
    border-top: 2px solid var(--background-color);
    border-bottom: 2px solid var(--background-color);
  }

  th:nth-child(1) {
    width: 20%;
  }
  th:nth-child(2) {
    width: 20%;
  }
  th:nth-child(3) {
    width: 40%;
  }
  th:nth-child(4) {
    width: 20%;
  }
`;

const BodyContainer = styled.div`
  max-height: 620px;
  overflow-y: scroll;
  border-bottom: 2px solid var(--background-color);
  margin-top: 10px;
  border-top: 2px solid var(--background-color);
  border-bottom: 2px solid var(--background-color);
  /* 스크롤바 스타일 강제 표시 (Chrome, Edge, Safari) */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb, var(--text-disabled));
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--scrollbar-track, var(--disabled));
  }
`;

const BodyTable = styled.table`
  width: 100%;
  text-align: center;
  color: var(--text-secondary);
  font-size: var(--font-size-title-small);
  font-weight: 500;
  table-layout: fixed;
  border-spacing: 0 10px;
  border-collapse: separate;
  td {
    padding: 30px 0;
    text-align: center;
  }

  td:nth-child(1) {
    width: 20%;
  }
  td:nth-child(2) {
    width: 20%;
  }
  td:nth-child(3) {
    width: 40%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  td:nth-child(4) {
    width: 20%;
  }
`;

const StatusCell = styled.span`
  display: inline-block;
  width: 96px;
  padding: 7px;
  border-radius: 8px;
  color: ${(props) =>
    props.$status === "정정 완료"
      ? "var(--blue)"
      : props.$status === "정정 불가"
      ? "var(--text-disabled)"
      : props.$status === "대기 중"
      ? "var(--green)"
      : "var(--text-secondary)"};
  background-color: ${(props) =>
    props.$status === "정정 완료"
      ? "var(--blue-bg)"
      : props.$status === "정정 불가"
      ? "var(--background-color)"
      : props.$status === "대기 중"
      ? "var(--green-bg)"
      : "transparent"};
  box-sizing: border-box;
`;

// 라벨 색 사용법 참고를 위한 tbody 입니다. data 불러와서 띄우면서 수정 충분히 가능합니다
const SalaryAdjustment = () => {
  return (
    <>
      <TitleContainer>
        <PageTitle title="정정 신청 / 내역" subtitle="정정 내역" />
        <Button>정정 신청</Button>
      </TitleContainer>
      <TableContainer>
        <HeaderTable>
          <thead>
            <tr>
              <th>신청 날짜</th>
              <th>정정 대상</th>
              <th>정정 사유</th>
              <th>처리 상태</th>
            </tr>
          </thead>
        </HeaderTable>

        <BodyContainer>
          <BodyTable>
            <tbody>
              <tr>
                <td>2025 / 02 / 08</td>
                <td>유급 휴가</td>
                <td>
                  유급 휴가가 반영되지 않았습니다. 이거 진짜 긴 이유인데 한 번
                  읽어보시겠어요?
                </td>
                <td>
                  <StatusCell $status="정정 완료">정정 완료</StatusCell>
                </td>
              </tr>
              <tr>
                <td>2025 / 02 / 08</td>
                <td>유급 휴가</td>
                <td>유급 휴가가 반영되지 않았습니다. 정정해주세요</td>
                <td>
                  <StatusCell $status="정정 불가">정정 불가</StatusCell>
                </td>
              </tr>
              <tr>
                <td>2025 / 02 / 08</td>
                <td>유급 휴가</td>
                <td>유급 휴가가 반영되지 않았습니다. 정정해주세요</td>
                <td>
                  <StatusCell $status="대기 중">대기 중</StatusCell>
                </td>
              </tr>
              <tr>
                <td>2025 / 02 / 08</td>
                <td>유급 휴가</td>
                <td>유급 휴가가 반영되지 않았습니다. 정정해주세요</td>
                <td>
                  <StatusCell $status="대기 중">대기 중</StatusCell>
                </td>
              </tr>
              <tr>
                <td>2025 / 02 / 08</td>
                <td>유급 휴가</td>
                <td>유급 휴가가 반영되지 않았습니다. 정정해주세요</td>
                <td>
                  <StatusCell $status="대기 중">대기 중</StatusCell>
                </td>
              </tr>
              <tr>
                <td>2025 / 02 / 08</td>
                <td>유급 휴가</td>
                <td>유급 휴가가 반영되지 않았습니다. 정정해주세요</td>
                <td>
                  <StatusCell $status="대기 중">대기 중</StatusCell>
                </td>
              </tr>
              <tr>
                <td>2025 / 02 / 08</td>
                <td>유급 휴가</td>
                <td>유급 휴가가 반영되지 않았습니다. 정정해주세요</td>
                <td>
                  <StatusCell $status="대기 중">대기 중</StatusCell>
                </td>
              </tr>
            </tbody>
          </BodyTable>
        </BodyContainer>
      </TableContainer>
    </>
  );
};

export default SalaryAdjustment;
