import styled from "styled-components";
import { useState, useEffect } from "react";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";

const Box = styled.div`
  display: flex;
  height: 562px;
  padding: 40px 52px 0 52px;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  border-radius: 12px;
  border: 1px solid var(--background-color);
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
`;

const Title = styled.span`
  color: var(--text-secondary);
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 44px;
  margin-right: 20px;
`;

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
`;

const Content = styled.div`
  color: var(--text-secondary);
  font-size: var(--font-size-title-small);
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  line-height: normal;
  align-items: center;
  line-height: 45.24px;

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

const BottomSection = styled.div`
  width: 100%;
  margin-top: auto; // 🚀 항상 하단에 고정!
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  min-height: 44px; // 버튼이 없을 때도 여백 유지!
  margin-top: 10px;
`;

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

const EditableCalcBox = ({ type, data = {}, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(data || {});

  useEffect(() => {
    setEditData(data || {}); // ✅ data 변경 시 editData 초기화
  }, [data]);

  const totalAmount = Object.values(editData || {}).reduce(
    (acc, val) => acc + val,
    0
  );

  const handleChange = (key, value) => {
    // 숫자만 입력받고, 천 단위 콤마 추가
    const numericValue = value.replace(/[^0-9]/g, ""); // 숫자만 허용
    setEditData({
      ...editData,
      [key]: numericValue ? parseInt(numericValue) : 0,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave(editData);
  };

  return (
    <Box>
      <TitleWrapper>
        <Title>{type === "payments" ? "지급 내역" : "공제 내역"}</Title>
        {!isEditing && (
          <Button size="sm" onClick={() => setIsEditing(true)}>
            수정하기
          </Button>
        )}
      </TitleWrapper>
      <Wrapper>
        {Object.keys(editData).length === 0 ? (
          <Content>
            <Left>미입력</Left>
            <Right>0 원</Right>
          </Content>
        ) : (
          Object.keys(editData)
            .sort((a, b) =>
              (salaryMapping[a] || a).localeCompare(
                salaryMapping[b] || b,
                "ko-KR"
              )
            )
            .map((key, index) => (
              <Content key={index}>
                <Left>{salaryMapping[key] || key}</Left>
                {isEditing ? (
                  <Input
                    id={key}
                    value={editData[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    isSubmitted={false} // 수정 중이므로 false
                    style={{ textAlign: "right" }}
                  />
                ) : (
                  <Right>{editData[key].toLocaleString()} 원</Right>
                )}
              </Content>
            ))
        )}
      </Wrapper>
      <BottomSection>
        <Calc>
          <Left>{type === "payments" ? "총 지급액" : "총 공제액"}</Left>
          <Right>{totalAmount.toLocaleString()} 원</Right>
        </Calc>
        <Line />
        {isEditing && (
          <ButtonWrapper>
            <Button size="sm" color="gray" onClick={() => setIsEditing(false)}>
              취소
            </Button>
            <Button size="sm" onClick={handleSave}>
              저장하기
            </Button>
          </ButtonWrapper>
        )}
      </BottomSection>
    </Box>
  );
};

export default EditableCalcBox;
