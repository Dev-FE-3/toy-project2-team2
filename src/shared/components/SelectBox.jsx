import React, { useState } from "react";
import styled from "styled-components";
import toggleIcon from "../../assets/images/Down.png";

const Container = styled.div`
  position: relative;
  display: inline-block;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 21.6px;
`;

const Button = styled.button`
  font-family: inherit;
  border: 1px solid var(--disabled);
  border-radius: 10px;
  background: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;

  width: ${(props) => (props.size === "large" ? "170px" : "164px")};
  height: ${(props) => (props.size === "large" ? "38px" : "42px")};
`;

const ButtonText = styled.span`
  flex-grow: 1;
  text-align: left;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 21.6px;
`;

const Icon = styled.img`
  width: 16px;
  height: 10px;
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
  width: 107px;
  height: 30px;
  gap: 10px;
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    color: var(--text-primary);
  }
`;

const GeneralSelect = ({
  options = [],
  defaultOption = "선택",
  onSelect,
  size = "large",
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option); // 부모 컴포넌트에서 선택값 받기
    }
  };

  return (
    <Container>
      <Button onClick={() => setIsOpen(!isOpen)} size={size}>
        <ButtonText>{selectedOption}</ButtonText>
        <Icon src={toggleIcon} alt="Toggle Dropdown" />
      </Button>

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
