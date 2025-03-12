import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { db, auth } from "../../../shared/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

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
  /* animation: ${slideIn} 1.5s ease-out; */
  cursor: pointer;
`

const CalendarSchedule = ({
  weeks, handleScheduleClick,
}) => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
  
    // 현재 로그인한 유저의 일정만 가져옴
    const schedulesQuery = query(collection(db, "schedules"),
      where("userId", "==", user.uid)
    );
  
    const unsubscribe = onSnapshot(schedulesQuery, (snapshot) => {
      const schedules = snapshot.docs.map((doc) => {
        const { userId, title, startDate, endDate, selectedColor, contents } = doc.data();
        return {
          userId,
          title,
          startDate: startDate.toDate(),
          endDate: endDate.toDate(),
          selectedColor,
          contents,
          id: doc.id,
        };
      });
      schedules.sort((a, b) => a.startDate - b.startDate);

      setSchedules(schedules);
    });
    return () => unsubscribe();
  }, [])

  return (
    <StyledCalendarDate>
      {weeks.map((week, weekIndex) => (
        <tr key={weekIndex}>
          {week.map(({ day, isDisabled, date }, dayIndex) => {
            const getDateOnly = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const todaySchedules = schedules.filter((schedule) => {
              const scheduleStart = getDateOnly(schedule.startDate);
              const scheduleEnd = getDateOnly(schedule.endDate);
              const currentDate = getDateOnly(date);
              
              return currentDate >= scheduleStart && currentDate <= scheduleEnd;
            });

            return (
              <td key={dayIndex} className={isDisabled ? "disabled" : ""}>
                <span className="date" dateTime={`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}>
                  {day}
                </span>

                {todaySchedules.map((schedule) => {
                  const currentDate = getDateOnly(date);
                  const scheduleStart = getDateOnly(schedule.startDate);
                  const scheduleEnd = getDateOnly(schedule.endDate);
                  const isFirstDay = currentDate.getTime() === scheduleStart.getTime();

                  // 현재 주에서 해당 일정이 처음 등장하는 날짜 찾기
                  const firstContinuedDate = week.find(({ date }) => {
                    const d = getDateOnly(date);
                    return d >= scheduleStart && d <= getDateOnly(week[6].date);
                  });
                
                  // 현재 date가 그 첫 날짜인지 확인
                  const isFirstContinuedDate = firstContinuedDate && firstContinuedDate.date.getTime() === currentDate.getTime();

                  const colSpan = week.reduce((count, { date: d }) => {
                    const current = getDateOnly(d);
                    return current >= scheduleStart && current <= scheduleEnd ? count + 1 : count;
                  }, 0);

                  return (
                    <ScheduleBar
                      key={schedule.id}
                      colSpan={isFirstDay || isFirstContinuedDate ? colSpan : 1}
                      color={schedule.selectedColor}
                      onClick={() => handleScheduleClick(schedule)}
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

export default CalendarSchedule