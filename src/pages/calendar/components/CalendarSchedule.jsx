import { useEffect, useState } from "react";
import styled from "styled-components";
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
    `}
`

const CalendarSchedule = ({ weeks, handleScheduleClick }) => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
  
    // 로그인한 유저의 일정만 가져옴
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

  // 날짜에서 연, 월, 일 정보만 남기고 시간 제거
  const getDateOnly = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // 현재 날짜에 해당하는 일정 필터링
  const getTodaySchedules = (date) => {
    const currentDate = getDateOnly(date);
    return schedules.filter(({ startDate, endDate }) => {
      return currentDate >= getDateOnly(startDate) && currentDate <= getDateOnly(endDate);
    });
  };

  // 달력 일정 ScheduleBar
  const getScheduleProps = (schedule, date, week) => {
    const currentDate = getDateOnly(date);
    const scheduleStart = getDateOnly(schedule.startDate);
    const scheduleEnd = getDateOnly(schedule.endDate);
    const isFirstDay = currentDate.getTime() === scheduleStart.getTime();

    // 현재 주에서 해당 일정이 처음 등장하는 날짜 찾기
    const firstContinuedDate = week.find(({ date }) => {
      const d = getDateOnly(date);
      return d >= scheduleStart && d <= getDateOnly(week[6].date);
    });

    // 현재 날짜가 그 첫 날짜인지 확인
    const isFirstContinuedDate = firstContinuedDate && firstContinuedDate.date.getTime() === currentDate.getTime();

    // ScheduleBar 넓이
    const colSpan = week.reduce((count, { date: d }) => {
      const current = getDateOnly(d);
      return current >= scheduleStart && current <= scheduleEnd ? count + 1 : count;
    }, 0);

    return { isFirstDay, isFirstContinuedDate, colSpan };
  };

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

export default CalendarSchedule