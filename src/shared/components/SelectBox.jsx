import React, { useState } from "react";
import styled from "styled-components";
import toggleIcon from "/images/Down.svg";

const sizes = {
  large: {
    fontSize: "16px",
    width: "170px",
    fontWeight: "400",
  },
  small: {
    fontSize: "18px",
    width: "154px",
    fontWeight: "500",
  },
  autoSmall: {
    fontSize: "var(--font-size-primary)",
    width: "100%",
    fontWeight: "400",
  },
};

const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const Button = styled.button`
  border: 1px solid
    ${(props) => (props.$error ? "var(--red)" : "var(--disabled)")};
  border-radius: 10px;
  background-color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 14px;

  ${({ size }) => `
    font-size: ${sizes[size]?.fontSize || "16px"};
    width: ${sizes[size]?.width || "170px"};
    font-weight: ${sizes[size]?.fontWeight || "400"};
  `}
`;

const Icon = styled.img`
  width: 16px;
  height: 10px;
`;

const Dropdown = styled.ul`
  position: absolute;
  left: 0;
  max-height: 154px;
  background: var(--white);
  border: 1px solid var(--disabled);
  border-radius: 10px;
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  z-index: 1;

  ${({ size }) => `
    font-size: ${sizes[size]?.fontSize || "16px"};
    width: ${sizes[size]?.width || "170px"};
    font-weight: ${sizes[size]?.fontWeight || "400"};
  `}
`;

const Option = styled.li`
  color: var(--text-disabled-2);
  padding: 8px 12px;
  &:hover {
    color: var(--text-primary);
  }
`;
const Label = styled.label`
  padding-left: 4px;
  color: var(--text-disabled);
  font-size: var(--text-size-primary);
`;

const SelectBox = ({
  label,
  options = [],
  defaultOption = "선택",
  onSelect,
  size = "large",
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setIsOpen(false);
    if (onSelect) {
      onSelect(option); // 부모 컴포넌트에서 선택값 받기
    }
  };

  return (
    <>
      {label && <Label>{label}</Label>}
      <Container>
        <Button onClick={() => setIsOpen(!isOpen)} size={size} $error={error} type="button">
          {defaultOption}
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
    </>
  );
};

export default SelectBox;
