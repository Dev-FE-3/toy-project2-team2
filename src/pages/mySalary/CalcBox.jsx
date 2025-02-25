import styled from "styled-components";

const Box = styled.div`
  display: flex;
  height: 562px;
  padding: 40px 52px 84px 52px;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  border-radius: 12px;
  border: 1px solid var(--background-color);
  justify-content: space-between; /* 상단과 하단을 분리 */
`;

const Title = styled.span`
  color: var(--text-sencondary);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 44px;
`;

const Wrapper = styled.div`
  flex-grow: 1; /* Wrapper가 가능한 공간을 모두 차지하도록 설정 */
  display: flex;
  flex-direction: column;
`;

const Content = styled.p`
  color: var(--text-sencondary);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &:not(:first-child) {
    margin-top: 18px;
  }
`;

const Calc = styled.span`
  color: var(--text-primary);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Line = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: var(--disabled);
  margin-top: 32px;
`;

const CalcBox = () => {
  return (
    <Box>
      <Title>지급 내역</Title>
      <Wrapper>
        <Content>기본급</Content>
        <Content>초과근무수당</Content>
        <Content>식비</Content>
      </Wrapper>
      <Calc>총 지급액</Calc>
      <Line />
    </Box>
  );
};

export default CalcBox;
