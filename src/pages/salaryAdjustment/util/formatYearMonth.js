export const formatYearMonth = (dateInput) => {
  const date = new Date(dateInput);

  // 해당 월의 첫 날짜를 기준으로 로컬 시간대에서 처리
  date.setDate(1); // 해당 월의 1일로 설정
  date.setHours(0, 0, 0, 0); // 시간을 00:00으로 설정

  // 'YYYY-MM' 형식으로 반환
  return date.toLocaleDateString("en-CA").slice(0, 7);
};
