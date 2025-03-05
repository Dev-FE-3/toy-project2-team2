import styled from "styled-components";
import Button from "../../../shared/components/Button";
import Modal from "./../../../shared/components/modal/Modal";
import IconArrow from "./IconArrow";
import ModalCalendar from "./ModalCalendar";

const StyledCalendarTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 36px;
  margin-bottom: 14px;
`

const StyledCalendarBtn = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;

  h2 {
    padding: 0 20px;
    font-size: var(--font-size-title-small);
    font-weight: 700;
    color: var(--text-disabled);
    letter-spacing: -0.36px;
  }

  button {
    padding: 0;
    background-color: transparent;

    svg {
      width: 20px;
    }
  }
`

const Form = styled.form`
  position: absolute;
`

const CalendarHeader = ({
  year, month,
  handlePrevMonth, handleNextMonth,
  handleSubmit,
  inputValue, setInputValue,
  startDate, setStartDate,
  endDate, setEndDate,
  selectedColor, setSelectedColor,
  textAreaValue, setTextAreaValue,
  selectedSchedule, setSelectedSchedule,
  isOpen, onOpen, onClose
}) => {

  return (
    <StyledCalendarTop>
      <StyledCalendarBtn>
        <button type="button" onClick={handlePrevMonth}>
          <IconArrow direction="left" />
        </button>
        <h2>{year}년 {month + 1}월</h2>
        <button type="button" onClick={handleNextMonth}>
          <IconArrow direction="right" />
        </button>
      </StyledCalendarBtn>
      <Button onClick={onOpen}>일정 등록</Button>
      {isOpen && (
        <Form onSubmit={handleSubmit}>
          <Modal
            title={selectedSchedule ? "일정 상세" : "일정 등록"}
            content={
              <ModalCalendar
                inputValue={inputValue}
                setInputValue={setInputValue}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                textAreaValue={textAreaValue}
                setTextAreaValue={setTextAreaValue}
              />
            }
            deleteButton={selectedSchedule ? true : false}
            hasSubmitButton={true}
            SubmitButton={selectedSchedule ? "수정하기" : "등록하기"}
            isOpen={isOpen}
            onClose={() => {
              // 모달 닫힐 때 초기화
              setSelectedSchedule(null);
              setInputValue("");
              setStartDate(new Date());
              setEndDate(new Date());
              setSelectedColor("orange");
              setTextAreaValue("");
              onClose();
            }}
          />
        </Form>
      )}
    </StyledCalendarTop>
  )
}

export default CalendarHeader