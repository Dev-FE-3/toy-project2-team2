import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: inline-block;
  font-family: Noto Sans KR;
  font-weight: 500;
  font-size: 18px;
  line-height: 21.6px;
`;

const Button = styled.button`
  font-size: 18px;
  border: 1px solid var(--disabled);
  border-radius: 10px;
  background: white;
  cursor: pointer;
  width: 154px;
  height: 42px;
  padding: 0 14px;
  display: flex;
  text-align: right;
  justify-content: space-between; /* 양쪽 끝 정렬 */
  align-items: center;
`;

const Dropdown = styled.ul`
  position: absolute;
  font-size: 18px;
  left: 0;
  width: 154px;
  height: 154px;
  background: white;
  border: 1px solid var(--disabled);
  border-radius: 10px;
  box-shadow: 0px 6px 12.7px 0px #00000026;
  max-height: 200px;
  overflow-y: auto;
  border-width: 1px;
  gap: 14px;
`;

const Option = styled.li`
  color: var(--text-disabled-2);
  width: 107;
  height: 30;
  gap: 10px;
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    color: var(--text-primary);
  }
`;

const GeneralSelect = () => {
  const [selectedOption, setSelectedOption] = useState("유형");
  const [isOpen, setIsOpen] = useState(false);

  const options = ["무급휴가", "연차", "병가", "기타"];

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <Container>
      <Button onClick={() => setIsOpen(!isOpen)}>{selectedOption} ▼</Button>

      {isOpen && (
        <Dropdown>
          {options.map((option, index) => (
            <Option key={index} onClick={() => handleSelect(option)}>
              {option}
            </Option>
          ))}
        </Dropdown>
      )}
    </Container>
  );
};

export default GeneralSelect;
