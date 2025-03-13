import useSchedules from "../hooks/useSchedules";

// 날짜에서 연, 월, 일 정보만 남기고 시간 제거
const getDateOnly = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

// 현재 날짜에 해당하는 일정 필터링
export const getTodaySchedules = (date) => {
  const schedules = useSchedules();
  const currentDate = getDateOnly(date);

  return schedules.filter(({ startDate, endDate }) => {
    return currentDate >= getDateOnly(startDate) && currentDate <= getDateOnly(endDate);
  });
};

// 달력 일정 ScheduleBar
export const getScheduleProps = (schedule, date, week) => {
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