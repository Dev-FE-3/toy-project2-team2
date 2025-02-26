import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import styled from "styled-components";
import CalendarIconSrc from "../../assets/images/Group.svg";
import React, { useState } from "react";

registerLocale("ko", ko);

const DatePickerWrapper = styled.div`
  align-items: center;
  width: ${(props) => (props.$type === "year-month" ? "170px" : "220px")};
  height: 38px;
  border: 1px solid var(--disabled);
  border-radius: 8px;
  background: var(--white);
  overflow: hidden;
  justify-content: space-between;
  font-family: Noto Sans KR;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
`;

const CustomInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 12px;
  box-sizing: border-box;
`;

const DateTextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  text-align: center;
  font-size: 16px;
  color: var(--text-primary);
  letter-spacing: 1px;
`;

const Separator = styled.span`
  margin: 0 12px;
  color: var(--disabled);
`;

const CalendarIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 38px;
  background: var(--background-color-3);
  border-left: 1px solid var(--disabled);
  border-radius: 0 8px 8px 0;
  margin-left: 13px;
`;

const CalendarIcon = styled.img`
  width: 16px;
  height: 18px;
  cursor: pointer;
`;

const formatDate = (date, type) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return type === "year-month"
    ? `${year} / ${month}`
    : `${year} / ${month} / ${day}`;
};

const CustomInput = React.forwardRef(({ value, onClick, ...rest }, ref) => {
  const [year, month, day] = value ? value.split("/") : ["----", "--", "--"];

  return (
    <CustomInputWrapper onClick={onClick} ref={ref} {...rest}>
      <DateTextBox>
        {year} <Separator>/</Separator> {month}{" "}
        {day && (
          <>
            <Separator>/</Separator> {day}
          </>
        )}
      </DateTextBox>
      <CalendarIconBox>
        <CalendarIcon src={CalendarIconSrc} alt="달력 아이콘" />
      </CalendarIconBox>
    </CustomInputWrapper>
  );
});

const StyledDatePicker = ({ type = "date", onChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onChange) onChange(date);
  };

  return (
    <DatePickerWrapper $type={type}>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat={type === "year-month" ? "yyyy/MM" : "yyyy/MM/dd"}
        locale="ko"
        showMonthYearPicker={type === "year-month"}
        customInput={<CustomInput value={formatDate(selectedDate, type)} />}
        showPopperArrow={false}
      />
    </DatePickerWrapper>
  );
};

export default StyledDatePicker;
