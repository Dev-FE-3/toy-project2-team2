import styled, { keyframes } from "styled-components";

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
    }
  }
`

const rgbColor = {
  orange: "255, 159, 45",
  regular: "88, 87, 87",
  red: "224, 82, 48",
  green: "76, 175, 80",
  blue: "0, 133, 255",
  default: "255, 255, 255",
};

const getColor = (color) => {
  const borderColor = `${color === "orange" ? "var(--orange)" :
    color === "regular" ? "var(--regular)" :
    color === "red" ? "var(--red)" :
    color === "green" ? "var(--green)" :
    color === "blue" ? "var(--blue)" :
    "var(--text-primary)"
  }`;
  
  const boxShadow = `0 4px 16px 0 rgba(${
    color === "orange" ? rgbColor.orange :
    color === "regular" ? rgbColor.regular :
    color === "red" ? rgbColor.red :
    color === "green" ? rgbColor.green :
    color === "blue" ? rgbColor.blue :
    rgbColor.default
  }, 2.2)`;

  return { borderColor, boxShadow };
};

const slideIn = keyframes`
  0% {
    opacity: 1;
    border-width: 2px;
    border-style: solid;
    border-color: ${({ color }) => getColor(color).borderColor};
    box-shadow: ${({ color }) => getColor(color).boxShadow};
  }

  25% {
    opacity: 0.4;
    border-width: 2px;
    border-style: solid;
    border-color: ${({ color }) => getColor(color).borderColor};
    box-shadow: ${({ color }) => getColor(color).boxShadow};
  }

  50% {
    opacity: 1;
    border-width: 2px;
    border-style: solid;
    border-color: ${({ color }) => getColor(color).borderColor};
    box-shadow: ${({ color }) => getColor(color).boxShadow};
  }

  75% {
    opacity: 0.4;
    border-width: 2px;
    border-style: solid;
    border-color: ${({ color }) => getColor(color).borderColor};
    box-shadow: ${({ color }) => getColor(color).boxShadow};
  }

  100% {
    opacity: 1;
    border: none;
    box-shadow: none;
  }
`

const Schedule = styled.span`
  display: block;
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
  background-color: ${({ color }) => 
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
  animation: ${slideIn} 1.5s ease-out;
  cursor: pointer;

  & + span {
    margin-top: 6px;
  }
`

const CalendarSchedule = ({
  weeks, schedules, handleScheduleClick
}) => {
  return (
    <StyledCalendarDate>
      {weeks.map((week, weekIndex) => (
        <tr key={weekIndex}>
          {week.map(({ day, isDisabled, date }, dayIndex) => {
            const todaySchedules = schedules.filter((schedule) => {
              const scheduleStart = new Date(
                schedule.startDate.getFullYear(),
                schedule.startDate.getMonth(),
                schedule.startDate.getDate()
              );
              const scheduleEnd = new Date(
                schedule.endDate.getFullYear(),
                schedule.endDate.getMonth(),
                schedule.endDate.getDate()
              );
              const currentDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
              );
              return currentDate >= scheduleStart && currentDate <= scheduleEnd;
            });
            return (
              <td key={dayIndex} className={isDisabled ? "disabled" : ""}>
                <span className="date" dateTime={`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}>
                  {day}
                </span>
                {todaySchedules.map((schedule, index) => (
                  <Schedule
                    key={index}
                    color={schedule.selectedColor}
                    onClick={() => handleScheduleClick(schedule)}
                  >
                    {schedule.title}
                  </Schedule>
                ))}
              </td>
            );
          })}
        </tr>
      ))}
    </StyledCalendarDate>
  )
}

export default CalendarSchedule