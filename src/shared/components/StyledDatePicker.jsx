import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import styled from "styled-components";
import CalendarIconSrc from "../../assets/images/Group.svg";

registerLocale("ko", ko);

const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: ${(props) => (props.type === "year-month" ? "170px" : "220px")};
  height: 42px;
  border: 2px solid #d9d9d9;
  border-radius: 8px;
  background: white;
  overflow: hidden;
`;

const CustomInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  font-size: 16px;
  padding: 0 12px;
  box-sizing: border-box;
  font-weight: 500;
`;

const DateTextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  text-align: center;
  font-size: 16px;
  color: #333;
  letter-spacing: 1px;
`;

const Separator = styled.span`
  margin: 0 12px;
  color: #aaa;
`;

const CalendarIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 38px;
  background: #f5f5f5;
  border: 2px solid #d9d9d9;
  border-radius: 0 8px 8px 0;
  margin-left: 10px;
`;

const CalendarIcon = styled.img`
  width: 25px;
  height: 25px;
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

const CustomInput = React.forwardRef(({ value, onClick }, ref) => {
  const [year, month, day] = value ? value.split("/") : ["----", "--", "--"];

  return (
    <CustomInputWrapper onClick={onClick} ref={ref}>
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
    <DatePickerWrapper type={type}>
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
