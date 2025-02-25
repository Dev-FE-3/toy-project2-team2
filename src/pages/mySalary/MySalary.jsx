import styled from "styled-components";
import PageTitle from "../../shared/components/titles/PageTitle";
import CalcBox from "./CalcBox";

const ContentBox = styled.div`
  margin-top: 30px;
`;

const InfoWrap = styled.div``;

const MyInfo = styled.div`
  color: var(--text-disabled);
  font-size: var(--font-size-primary);
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;

const MonthSort = styled.div``;

const SalaryCalcBox = styled.div`
  margin-top: 26px;
  display: flex;
  //width: 1240px;
  flex: 1;
  padding: 24px 30px;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  border: 1px solid var(--background-color);
  background-color: var(--accent);
  color: var(--white);
  font-size: var(--font-size-title-medium);
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;
`;

const CalcWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between; /* 가로로 나열 */
  gap: 16px; /* 두 박스 사이의 간격 16px */
`;

const MySalary = () => {
  return (
    <>
      <PageTitle title="급여 확인" />
      <ContentBox>
        <InfoWrap>
          <MyInfo>내 정보 여기에 firebase storage에서 불러와야 합니다 </MyInfo>
          <MonthSort />
        </InfoWrap>
        <SalaryCalcBox>실 지급액</SalaryCalcBox>
        <CalcWrapper>
          <CalcBox />
          <CalcBox />
        </CalcWrapper>
      </ContentBox>
    </>
  );
};

export default MySalary;
