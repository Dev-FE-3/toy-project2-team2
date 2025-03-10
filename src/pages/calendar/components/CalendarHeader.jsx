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

const CalendarHeader = ({
  year, month,
  handlePrevMonth, handleNextMonth,
  handleSubmit, handleSave, handleDelete, handleEdit,
  inputValue, setInputValue,
  startDate, setStartDate,
  endDate, setEndDate,
  selectedColor, setSelectedColor,
  textAreaValue, setTextAreaValue,
  selectedSchedule, setSelectedSchedule,
  isOpen, onOpen, onClose, onEdit,
  isSubmitted, setIsSubmitted,
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
              isSubmitted={isSubmitted}
            />
          }
          isDeleteButton={selectedSchedule ? true : false}
          hasSubmitButton={true}
          submitButton={selectedSchedule ? (isSubmitted ? "수정하기" : "저장하기") : "등록하기"}
          isOpen={isOpen}
          onClose={() => {
            // 모달 닫힐 때 초기화
            setSelectedSchedule(null);
            setInputValue("");
            setStartDate(new Date());
            setEndDate(new Date());
            setSelectedColor("orange");
            setTextAreaValue("");
            setIsSubmitted(false);
            onClose();
          }}
          onSubmit={selectedSchedule ? () => handleSave(selectedSchedule) : handleSubmit}
          onDelete={handleDelete}
          isEdit={isSubmitted ? true : false}
          onEdit={handleEdit}
        />
      )}
    </StyledCalendarTop>
  )
}

export default CalendarHeader