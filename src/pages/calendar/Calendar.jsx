import { useState } from "react";
import styled from "styled-components";
import PageTitle from "../../shared/components/PageTitle";
import useModal from "../../shared/components/modal/useModal";
import CalendarHeader from "./components/CalendarHeader";
import CalendarSchedule from "./components/CalendarSchedule";
import { db, auth } from "../../shared/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const StyledCalendarWrapper = styled.div`
  margin-bottom: 82px;
`;

const StyledCalendar = styled.table`
  table-layout: fixed;
  width: 100%;
  border-radius: 8px;
  background-color: var(--white);
`;

const StyledCalendarWeek = styled.thead`
  tr {
    th {
      width: 14.28%;
      padding: 12px;
      font-size: var(--font-size-primary);
      font-weight: 400;
      line-height: 24px;
      color: var(--text-disabled);
      text-align: left;
      border: 1px solid var(--regular-bg);
    }
  }
`;

const Calendar = () => {
  // 달력
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  // 모달
  const { isOpen, onOpen, onClose, onDelete, onEdit } = useModal();
  const [inputValue, setInputValue] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedColor, setSelectedColor] = useState("orange");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 달력 생성
  const generateCalendarDays = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 첫 번째 날짜의 요일
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 이번 달의 총 일 수
    const prevMonthDays = new Date(year, month, 0).getDate(); // 이전 달의 총 일 수
    const calendarDays = [];

    // 첫 주 빈칸에 이전 달 날짜 추가
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      calendarDays.push({
        day: prevMonthDays - i,
        isDisabled: true,
        date: new Date(year, month - 1, prevMonthDays - i),
      });
    }

    // 이번 달 날짜 추가
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        day: i,
        isDisabled: false,
        date: new Date(year, month, i),
      });
    }

    // 마지막 주 빈칸에 다음 달 날짜 추가
    let nextMonthDay = 1; // 1일부터 시작
    while (calendarDays.length % 7 !== 0) {
      calendarDays.push({
        day: nextMonthDay++,
        isDisabled: true,
        date: new Date(year, month + 1, nextMonthDay - 1),
      });
    }

    // 7일씩 나누어 배열 생성
    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }

    return weeks;
  };

  const weeks = generateCalendarDays(year, month);

  // 이전 달로 이동
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // 일정 추가
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return;

    try {
      await addDoc(collection(db, "schedules"), {
        title: inputValue,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        selectedColor,
        contents: textAreaValue,
        userId: user.uid,
      })
    } catch(error) {
      console.error("일정 추가 실패: ", error);
    }

    // 등록 후 초기화
    setIsSubmitted(false);
    setInputValue("");
    setStartDate(new Date());
    setEndDate(new Date());
    setSelectedColor("orange");
    setTextAreaValue("");

    // 등록 후 모달 닫기
    onClose();
  }

  // 일정 수정 가능 상태
  const handleEdit = () => {
    setIsSubmitted(false);
  }

  // 일정 수정 후 저장
  const handleSave = async (schedule) => {
    const scheduleRef = doc(db, "schedules", schedule.id);

    const user = auth.currentUser;
    if (!user) return;

    try {
      await updateDoc(scheduleRef, {
        title: inputValue,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        selectedColor,
        contents: textAreaValue,
      });
    } catch (error) {
      console.error("일정 수정 실패: ", error);
    }

    // 수정 후 모달 닫기
    onClose();
  }

  const handleScheduleClick = (schedule) => {
    // 클릭한 일정을 저장
    setSelectedSchedule(schedule);
    setInputValue(schedule.title);
    setStartDate(new Date(schedule.startDate));
    setEndDate(new Date(schedule.endDate));
    setSelectedColor(schedule.selectedColor);
    setTextAreaValue(schedule.contents);

    // 수정 비활성화
    setIsSubmitted(true);

    // 모달 열기
    onOpen();
  };

  // 일정 삭제
  const handleDelete = async () => {
    const ok = confirm("일정을 삭제하시겠습니까?");
    if (!ok || !selectedSchedule?.id) return;

    try {
      await deleteDoc(doc(db, "schedules", selectedSchedule.id));

      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <PageTitle title="내 일정" />
      <StyledCalendarWrapper>
        <CalendarHeader
          year={year}
          month={month}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          handleSubmit={handleSubmit}
          handleSave={handleSave}
          handleDelete={handleDelete}
          selectedSchedule={selectedSchedule}
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
          setSelectedSchedule={setSelectedSchedule}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          handleEdit={handleEdit}
          onEdit={onEdit}
        />
        <StyledCalendar>
          <StyledCalendarWeek>
            <tr>
              {daysOfWeek.map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
          </StyledCalendarWeek>
          <CalendarSchedule
            weeks={weeks}
            handleScheduleClick={handleScheduleClick}
          />
        </StyledCalendar>
      </StyledCalendarWrapper>
    </>
  );
};

export default Calendar;
