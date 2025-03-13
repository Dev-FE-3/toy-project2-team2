import { useState } from "react";
import styled from "styled-components";
import PageTitle from "../../shared/components/PageTitle";
import CalendarHeader from "./components/CalendarHeader";
import CalendarBody from "./components/CalendarBody";
import useModal from "../../shared/components/modal/useModal";
import Modal from "./../../shared/components/modal/Modal";
import ModalContent from "./components/ModalContent";
import { useCalendar } from "./hooks/useCalendar";
import { db, auth } from "../../shared/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";

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
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const { currentDate, weeks, handlePrevMonth, handleNextMonth } =
    useCalendar();

  // 모달
  const { isOpen, onOpen, onClose } = useModal();
  const [inputValue, setInputValue] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedColor, setSelectedColor] = useState("orange");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleModalClose = () => {
    // 상태 초기화
    setSelectedSchedule(null);
    setInputValue("");
    setStartDate(new Date());
    setEndDate(new Date());
    setSelectedColor("orange");
    setTextAreaValue("");
    setIsSubmitted(false);

    // 모달 닫기
    onClose();
  };

  // 일정 추가
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 제목 필수 입력 확인
    if (inputValue === "") {
      return toast.warn("제목을 입력해 주세요.");
    }

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
      });

      handleModalClose();
    } catch (error) {
      console.error("일정 추가 실패: ", error);
    }
  };

  // 일정 수정 가능 상태
  const handleEdit = () => {
    setIsSubmitted(false);
  };

  // 일정 수정 후 저장
  const handleSave = async (schedule) => {
    // 제목 필수 입력 확인
    if (inputValue === "") {
      return toast.warn("제목을 입력해 주세요.");
    }

    const user = auth.currentUser;
    if (!user) return;

    const scheduleRef = doc(db, "schedules", schedule.id);
    try {
      await updateDoc(scheduleRef, {
        title: inputValue,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        selectedColor,
        contents: textAreaValue,
      });

      handleModalClose();
    } catch (error) {
      console.error("일정 수정 실패: ", error);
    }
  };

  // 등록된 일정 클릭
  const handleScheduleClick = (schedule) => {
    // 등록된 일정 내용 업데이트
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

      handleModalClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <PageTitle title="내 일정" />
      <StyledCalendarWrapper>
        <CalendarHeader
          year={currentDate.getFullYear()}
          month={currentDate.getMonth()}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          onOpen={onOpen}
        />
        {isOpen && (
          <Modal
            title={selectedSchedule ? "일정 상세" : "일정 등록"}
            content={
              <ModalContent
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
                isSubmitted={isSubmitted}
              />
            }
            buttonName={selectedSchedule ? "저장하기" : "등록하기"}
            onSubmit={
              selectedSchedule
                ? () => handleSave(selectedSchedule)
                : handleSubmit
            }
            onEdit={isSubmitted ? handleEdit : null}
            onDelete={selectedSchedule ? handleDelete : null}
            isOpen={isOpen}
            onClose={handleModalClose}
          />
        )}
        <StyledCalendar>
          <StyledCalendarWeek>
            <tr>
              {daysOfWeek.map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
          </StyledCalendarWeek>
          <CalendarBody
            weeks={weeks}
            handleScheduleClick={handleScheduleClick}
          />
        </StyledCalendar>
      </StyledCalendarWrapper>
    </>
  );
};

export default Calendar;
