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
import { collection, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
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

const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"];

const DEFAULT_FORM_DATA = {
  title: "",
  startDate: new Date(),
  endDate: new Date(),
  selectedColor: "orange",
  contents: "",
  selectedSchedule: null,
};

const Calendar = () => {
  // 달력
  const { currentDate, weeks, handlePrevMonth, handleNextMonth } = useCalendar();

  // 모달
  const { isOpen, onOpen, onClose } = useModal();
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormData = ({ key, value }) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleModalClose = () => {
    // 상태 초기화
    setFormData(DEFAULT_FORM_DATA);
    setIsSubmitted(false);

    // 모달 닫기
    onClose();
  };

  // 일정 추가
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.title === "") {
      return toast.warn("제목을 입력해 주세요.");
    }

    try {
      await addDoc(collection(db, "schedules"), {
        title: formData.title,
        startDate: formData.startDate,
        endDate: formData.endDate,
        selectedColor: formData.selectedColor,
        contents: formData.contents,
        userId: auth.currentUser.uid,
      });
      handleModalClose();
    } catch (error) {
      console.error("일정 추가 실패: ", error);
    }
  };

  // 일정 수정 후 저장
  const handleSave = async () => {
    if (formData.title === "") {
      return toast.warn("제목을 입력해 주세요.");
    }

    try {
      await updateDoc(doc(db, "schedules", formData.selectedSchedule.id), {
        title: formData.title,
        startDate: formData.startDate,
        endDate: formData.endDate,
        selectedColor: formData.selectedColor,
        contents: formData.contents,
      });
      handleModalClose();
    } catch (error) {
      console.error("일정 수정 실패: ", error);
    }
  };

  // 등록된 일정 클릭
  const handleScheduleClick = (schedule) => {
    // 등록된 일정 내용 업데이트
    setFormData({
      title: schedule.title,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      selectedColor: schedule.selectedColor,
      contents: schedule.contents,
      selectedSchedule: schedule,
    });

    // 수정 비활성화
    setIsSubmitted(true);

    // 모달 열기
    onOpen();
  };

  // 일정 삭제
  const handleDelete = async () => {
    const ok = confirm("일정을 삭제하시겠습니까?");
    if (!ok || !formData.selectedSchedule?.id) return;

    try {
      await deleteDoc(doc(db, "schedules", formData.selectedSchedule.id));
      handleModalClose();
    } catch (error) {
      console.error("일정 삭제 실패: ", error);
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
            title={formData.selectedSchedule ? "일정 상세" : "일정 등록"}
            content={
              <ModalContent
                formData={formData}
                handleFormData={handleFormData}
                isSubmitted={isSubmitted}
              />
            }
            buttonName={formData.selectedSchedule ? "저장하기" : "등록하기"}
            onSubmit={formData.selectedSchedule ? handleSave : handleSubmit}
            onEdit={isSubmitted ? () => setIsSubmitted(false) : null}
            onDelete={formData.selectedSchedule ? handleDelete : null}
            isOpen={isOpen}
            onClose={handleModalClose}
          />
        )}
        <StyledCalendar>
          <StyledCalendarWeek>
            <tr>
              {DAYS_OF_WEEK.map((day, index) => (
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
