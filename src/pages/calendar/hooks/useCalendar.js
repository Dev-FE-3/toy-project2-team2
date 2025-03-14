import { useState } from "react";

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 달력 생성
  const generateCalendarDays = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 첫 번째 날짜의 요일
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 이번 달의 총 일 수
    const prevMonthDays = new Date(year, month, 0).getDate(); // 이전 달의 총 일 수
    const calendarDays = [];

    // 첫 주 빈칸에 이전 달 날짜 추가
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      calendarDays.push({ day: prevMonthDays - i, isDisabled: true, date: new Date(year, month - 1, prevMonthDays - i) });
    }

    // 이번 달 날짜 추가
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({ day: i, isDisabled: false, date: new Date(year, month, i) });
    }

    // 마지막 주 빈칸에 다음 달 날짜 추가
    let nextMonthDay = 1; // 1일 부터 시작
    while (calendarDays.length % 7 !== 0) {
      calendarDays.push({ day: nextMonthDay++, isDisabled: true, date: new Date(year, month + 1, nextMonthDay - 1) });
    }

    // 7일씩 배열 생성
    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }

    return weeks;
  };

  const weeks = generateCalendarDays(year, month);

  return {
    currentDate,
    setCurrentDate,
    weeks,
    handlePrevMonth: () => setCurrentDate(new Date(year, month - 1, 1)),
    handleNextMonth: () => setCurrentDate(new Date(year, month + 1, 1)),
  };
};
