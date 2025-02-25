import React, { useState } from "react";
import styled from "styled-components";
import { format, subMonths } from "date-fns";

// Styled Components
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
  gap: 10px;
  border-width: 1px;
  padding-right: 14px;
  padding-left: 14px;
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

const SelectBox = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  // 지난 12개월 생성
  const pastMonths = Array.from({ length: 12 }, (_, i) =>
    subMonths(new Date(), i)
  );

  const handleSelect = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  return (
    <Container>
      <Button onClick={() => setIsOpen(!isOpen)}>
        {format(selectedDate, "yyyy년 MM월")} ▼
      </Button>

      {isOpen && (
        <Dropdown>
          {pastMonths.map((date, index) => (
            <Option key={index} onClick={() => handleSelect(date)}>
              {format(date, "yyyy년 MM월")}
            </Option>
          ))}
        </Dropdown>
      )}
    </Container>
  );
};

export default SelectBox;
