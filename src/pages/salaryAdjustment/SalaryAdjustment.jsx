import {
  PageTitle,
  StyledSubTitle,
} from "../../shared/components/titles/PageTitle";
import styled from "styled-components";
import Button from "../../shared/components/button/Button";

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
`;

const TableContainer = styled.div`
  width: 100%;
  margin-top: 45px;
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
  //max-height: 540px;
  max-height: 600px;
  overflow-y: auto;
  border-bottom: 2px solid var(--background-color);
  margin-top: 10px;
  border-top: 2px solid var(--background-color);
  border-bottom: 2px solid var(--background-color);
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
    props.status === "정정 완료"
      ? "var(--blue)"
      : props.status === "정정 불가"
      ? "var(--text-disabled)"
      : props.status === "대기 중"
      ? "var(--green)"
      : "var(--text-secondary)"};
  background-color: ${(props) =>
    props.status === "정정 완료"
      ? "var(--blue-bg)"
      : props.status === "정정 불가"
      ? "var(--background-color)"
      : props.status === "대기 중"
      ? "var(--green-bg)"
      : "transparent"};
  box-sizing: border-box;
`;

const SalaryAdjustment = () => {
  const subtitle = "정정 내역";
  return (
    <>
      <PageTitle title="정정 신청 / 내역" />
      <Container>
        <StyledSubTitle>{subtitle}</StyledSubTitle>
        <Button>정정 신청</Button>
      </Container>
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
                  <StatusCell status="정정 완료">정정 완료</StatusCell>
                </td>
              </tr>
              <tr>
                <td>2025 / 02 / 08</td>
                <td>유급 휴가</td>
                <td>유급 휴가가 반영되지 않았습니다. 정정해주세요</td>
                <td>
                  <StatusCell status="정정 불가">정정 불가</StatusCell>
                </td>
              </tr>
              <tr>
                <td>2025 / 02 / 08</td>
                <td>유급 휴가</td>
                <td>유급 휴가가 반영되지 않았습니다. 정정해주세요</td>
                <td>
                  <StatusCell status="대기 중">대기 중</StatusCell>
                </td>
              </tr>
              <tr>
                <td>2025 / 02 / 08</td>
                <td>유급 휴가</td>
                <td>유급 휴가가 반영되지 않았습니다. 정정해주세요</td>
                <td>
                  <StatusCell status="대기 중">대기 중</StatusCell>
                </td>
              </tr>
              <tr>
                <td>2025 / 02 / 08</td>
                <td>유급 휴가</td>
                <td>유급 휴가가 반영되지 않았습니다. 정정해주세요</td>
                <td>
                  <StatusCell status="대기 중">대기 중</StatusCell>
                </td>
              </tr>
              <tr>
                <td>2025 / 02 / 08</td>
                <td>유급 휴가</td>
                <td>유급 휴가가 반영되지 않았습니다. 정정해주세요</td>
                <td>
                  <StatusCell status="대기 중">대기 중</StatusCell>
                </td>
              </tr>
              <tr>
                <td>2025 / 02 / 08</td>
                <td>유급 휴가</td>
                <td>유급 휴가가 반영되지 않았습니다. 정정해주세요</td>
                <td>
                  <StatusCell status="대기 중">대기 중</StatusCell>
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
