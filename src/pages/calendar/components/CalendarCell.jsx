import styled from "styled-components";
import { getTodaySchedules, getScheduleProps } from "../utils/getSchedules";
import ScheduleBar from "./ScheduleBar";

const TableTd = styled.td`
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
`

const CalendarCell = ({ date, day, isDisabled, week, handleScheduleClick }) => {
  const todaySchedules = getTodaySchedules(date);

  return (
    <TableTd className={isDisabled ? "disabled" : ""}>
      {/* 날짜 */}
      <span className="date" dateTime={`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}>
        {day}
      </span>

      {/* 일정 표시 */}
      {todaySchedules.map((schedule) => {
        const { isFirstDay, isFirstContinuedDate, colSpan } = getScheduleProps(schedule, date, week);

        return (
          <ScheduleBar
            key={schedule.id}
            colSpan={isFirstDay || isFirstContinuedDate ? colSpan : 1}
            color={schedule.selectedColor}
            onClick={() => handleScheduleClick(schedule)}
            $empty={isFirstContinuedDate === false ? "" : null}
            title={isFirstDay ? schedule.title : ""}
          />
        );
      })}
    </TableTd>
  );
};

export default CalendarCell;
