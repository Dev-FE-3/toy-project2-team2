import React, { useRef } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import styled from "styled-components";
import CalendarIconSrc from "/images/Group.svg";

registerLocale("ko", ko);

const Label = styled.label`
  font-size: var(--font-size-primary);
  font-weight: 400;
  color: var(--text-disabled);
  
  ${(props) =>
    props.$issubmitted &&
    `
      pointer-events: none;
    `}
`

const DatePickerWrapper = styled.div`
  align-items: center;
  width: ${(props) => (props.$type === "year-month" ? "170px" : "220px")};
  height: 38px;
  border: 1px solid var(--disabled);
  border-radius: 8px;
  background-color: var(--white);
  overflow: hidden;
  justify-content: space-between;
  font-weight: 400;
  font-size: var(--font-size-primary);
  line-height: 24px;
  letter-spacing: 0%;
  cursor: pointer;

  ${(props) =>
    props.$issubmitted &&
    `
      pointer-events: none;
    `}
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
  font-size: var(--font-size-primary);
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

const DatePicker = ({ id, label, type = "date", value = new Date(), onChange, isSubmitted }) => {
  const datePickerRef = useRef(null);

  return (
    <>
      {label && <Label htmlFor={id} $issubmitted={isSubmitted} onClick={() => datePickerRef.current?.setOpen(true)}>{label}</Label>}
      <DatePickerWrapper $type={type} $issubmitted={isSubmitted}>
        <ReactDatePicker
          id={id}
          ref={datePickerRef}
          selected={value}
          onChange={onChange}
          dateFormat={type === "year-month" ? "yyyy/MM" : "yyyy/MM/dd"}
          locale="ko"
          showMonthYearPicker={type === "year-month"}
          customInput={<CustomInput value={formatDate(value, type)} />}
          showPopperArrow={false}
        />
      </DatePickerWrapper>
    </>
  );
};

export default DatePicker;
