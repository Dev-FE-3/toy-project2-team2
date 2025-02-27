import React, { useState } from "react";
import styled from "styled-components";
import toggleIcon from "../../assets/images/Down.svg";

const Container = styled.div`
  position: relative;
  display: inline-block;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  font-size: var(--font-size-title-small);
  line-height: 21.6px;
`;

const Button = styled.button`
  font-family: inherit;
  border: 1px solid var(--disabled);
  border-radius: 10px;
  background: var(--white);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px;
  font-weight: 400;
  font-size: var(--font-size-title-small);

  width: ${(props) => (props.size === "large" ? "170px" : "154px")};
  height: ${(props) => (props.size === "large" ? "38px" : "42px")};
`;

const ButtonText = styled.span`
  flex-grow: 1;
  text-align: left;
  font-weight: 400;
  line-height: 21.6px;
`;

const Icon = styled.img`
  width: 16px;
  height: 10px;
`;

const Dropdown = styled.ul`
  position: absolute;
  left: 0;
  height: 154px;
  background: var(--white);
  border: 1px solid var(--disabled);
  border-radius: 10px;
  box-shadow: 0px 6px 12.7px 0px #00000026;
  max-height: 200px;
  overflow-y: auto;

  width: ${(props) => (props.size === "large" ? "170px" : "154px")};
`;

const Option = styled.li`
  color: var(--text-disabled-2);
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
        <Dropdown size={size}>
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
