import styled from "styled-components";
import Button from "../../../shared/components/Button";
import IconArrow from "./IconArrow";

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
  year, month, handlePrevMonth, handleNextMonth, onOpen
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
    </StyledCalendarTop>
  )
}

export default CalendarHeader