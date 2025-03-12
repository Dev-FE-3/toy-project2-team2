import styled from "styled-components";
import { getScheduleProps, getTodaySchedules } from "../utils/getSchedules";

const StyledCalendarDate = styled.tbody`
  tr {
    td {
      width: 14.28%;
      height: 126px;
      font-size: var(--font-size-title-small);
      font-weight: 500;
      color: var(--text-primary);
      border: 1px solid var(--regular-bg);

      &.disabled {
        color: var(--text-disabled);
        background-color: #F8F8F8;
      }

      .date {
        display: block;
        padding: 12px 12px 16px;
      }

      span {
        & + span {
          margin-top: 6px;
        }
      }
    }
  }
`

const ScheduleBar = styled.span`
  display: block;
  position: relative;
  width: ${({ colSpan }) => `calc(${colSpan * 100}% + ${(colSpan - 1) * 1}px)`};
  z-index: ${({ colSpan }) => (colSpan === 1 ? 0 : 1)};
  height: 28px;
  padding: 3px 12px;
  font-size: var(--font-size-title-small);
  font-weight: 700;
  letter-spacing: -0.36px;
  color: ${({ color }) => 
		color === "orange" ? "var(--orange)" : 
    color === "regular" ? "var(--regular)" : 
    color === "red" ? "var(--red)" : 
    color === "green" ? "var(--green)" : 
    color === "blue" ? "var(--blue)" : "var(--text-primary)"};
  background-color: ${({ $empty, color }) => 
    $empty === "" ? "transparent" :
		color === "orange" ? "var(--orange-bg)" : 
    color === "regular" ? "var(--regular-bg)" : 
    color === "red" ? "var(--red-bg)" : 
    color === "green" ? "var(--green-bg)" : 
    color === "blue" ? "var(--blue-bg)" : "var(--white)"};
  border-radius: 4px;
  box-sizing: border-box;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;

  ${({ $empty }) =>
    $empty === "" &&
    `
      pointer-events: none;
    `
  }
`

const CalendarBody = ({ weeks, handleScheduleClick }) => {
  return (
    <StyledCalendarDate>
      {weeks.map((week, weekIndex) => (
        <tr key={weekIndex}>
          {week.map(({ day, isDisabled, date }, dayIndex) => {
            const todaySchedules = getTodaySchedules(date);

            return (
              <td key={dayIndex} className={isDisabled ? "disabled" : ""}>
                {/* 달력 날짜 */}
                <span className="date" dateTime={`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}>
                  {day}
                </span>

                {/* 달력 일정 ScheduleBar */}
                {todaySchedules.map((schedule) => {
                  const { isFirstDay, isFirstContinuedDate, colSpan } = getScheduleProps(schedule, date, week);

                  return (
                    <ScheduleBar
                      key={schedule.id}
                      colSpan={isFirstDay || isFirstContinuedDate ? colSpan : 1}
                      color={schedule.selectedColor}
                      onClick={() => handleScheduleClick(schedule)}
                      $empty={isFirstContinuedDate === false ? "" : null}
                    >
                      {isFirstDay ? schedule.title : ""}
                    </ScheduleBar>
                  );
                })}
              </td>
            );
          })}
        </tr>
      ))}
    </StyledCalendarDate>
  )
}

export default CalendarBody