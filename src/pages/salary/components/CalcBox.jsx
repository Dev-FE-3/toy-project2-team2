import styled from "styled-components";

// 스타일 컴포넌트 정의
const Box = styled.div`
  display: flex;
  height: 562px;
  padding: 40px 52px 84px 52px;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  border-radius: 12px;
  border: 1px solid var(--background-color);
  justify-content: space-between;
`;

const Title = styled.span`
  color: var(--text-secondary);
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 44px;
`;

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Content = styled.div`
  color: var(--text-secondary);
  font-size: var(--font-size-title-small);
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  line-height: 45.24px;
  align-items: center;
  &:not(:first-child) {
    margin-top: 18px;
  }
`;

const Left = styled.span``;

const Right = styled.span`
  text-align: right;
`;

const Calc = styled.span`
  color: var(--text-primary);
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Line = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: var(--disabled);
  margin-top: 32px;
`;

// 급여 항목 매핑
const salaryMapping = {
  baseSalary: "기본급",
  overtimePay: "초과근무수당",
  mealAllowance: "식대",
  pension: "국민연금",
  healthInsurance: "건강보험",
  employmentInsurance: "고용보험",
  incomeTax: "소득세",
  localIncomeTax: "지방소득세",
};

// 지급 내역과 공제 내역을 렌더링하는 컴포넌트
const CalcBox = ({ type, data }) => {
  // 각 급여 항목의 총합 계산
  const totalAmount = Object.values(data).reduce((acc, val) => acc + val, 0);

  return (
    <Box>
      <Title>{type === "payments" ? "지급 내역" : "공제 내역"}</Title>
      <Wrapper>
        {Object.keys(data).length === 0 ? (
          <Content>
            <Left>미입력</Left>
            <Right>0 원</Right>
          </Content>
        ) : (
          Object.keys(data)
            .sort((a, b) =>
              (salaryMapping[a] || a).localeCompare(
                salaryMapping[b] || b,
                "ko-KR"
              )
            )
            .map((key, index) => (
              <Content key={index}>
                <Left>{salaryMapping[key] || key}</Left>
                <Right>{data[key].toLocaleString("ko-KR")} 원</Right>
              </Content>
            ))
        )}
      </Wrapper>
      <Calc>
        <Left>{type === "payments" ? "총 지급액" : "총 공제액"}</Left>
        <Right>{totalAmount.toLocaleString("ko-KR")} 원</Right>
      </Calc>
      <Line />
    </Box>
  );
};

export default CalcBox;
