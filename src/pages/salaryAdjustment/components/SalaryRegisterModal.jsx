import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../shared/firebase"; // Firebase 설정 파일 import
import styled from "styled-components";
import useModal from "../../../shared/components/modal/useModal"; // 모달 관련 커스텀 훅 import
import Modal from "../../../shared/components/modal/Modal";
import Button from "../../../shared/components/Button";
import SelectBox from "../../../shared/components/SelectBox";
import DatePicker from "../../../shared/components/DatePicker";
import TextArea from "../../../shared/components/TextArea";
import { ToastContainer, toast } from "react-toastify";
// 스타일 정의
const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  & > li {
    display: flex;
    flex-wrap: wrap;
    gap: 28px;
    align-items: center;

    &.textarea {
      width: 100%;

      & > div {
        width: 100%;
      }
    }

    & > label {
      min-width: 45px;
      color: var(--text-disabled);
    }
  }
`;

// 정정 유형 옵션 리스트
const leaveOptions = [
  "유급 휴가",
  "무급 휴가",
  "업무 연장",
  "휴일 근무",
  "연차",
  "병가",
];

/**
 * 정정 신청 모달의 내용 컴포넌트
 * @param {Object} props - 부모 컴포넌트에서 전달받은 상태 및 setter 함수
 */
const SalaryRegisterModalContent = ({
  yearMonth,
  selectedLeaveType,
  inputValue,
  setYearMonth,
  setSelectedLeaveType,
  setInputValue,
  isSubmitted,
}) => {
  return (
    <List>
      <li>
        <label htmlFor="salary-date">정정 대상</label>
        <DatePicker
          id="salary-date"
          type="year-month"
          value={yearMonth}
          onChange={setYearMonth}
          isSubmitted={isSubmitted}
        />
      </li>
      <li>
        <label htmlFor="salary-type">정정 유형</label>
        <SelectBox
          id="salary-type"
          options={leaveOptions}
          defaultOption={selectedLeaveType}
          onSelect={setSelectedLeaveType}
          size="large"
          isSubmitted={isSubmitted}
        />
      </li>
      <li className="textarea">
        <TextArea
          rows={5}
          id="reason"
          label="정정 사유"
          placeholder="정정 사유를 입력하세요."
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          isSubmitted={isSubmitted}
        />
      </li>
    </List>
  );
};

/**
 * 정정 신청 모달 컴포넌트
 * @param {Object} props - 부모 컴포넌트에서 전달받은 사용자 ID
 */
const SalaryRegisterModal = ({ userId }) => {
  const { isOpen, onOpen, onClose } = useModal(); // 모달 상태 관리
  const [yearMonth, setYearMonth] = useState(new Date()); // 날짜 선택 상태
  const [selectedLeaveType, setSelectedLeaveType] = useState("유형"); // 정정 유형 선택 상태
  const [inputValue, setInputValue] = useState(""); // 정정 사유 입력 상태

  /**
   * Firebase에 정정 신청 데이터를 저장하는 함수
   * @param {string} userId - 사용자 ID
   * @param {Date} date - 선택한 날짜
   * @param {string} type - 정정 유형
   * @param {string} reason - 정정 사유
   */
  const handleRegister = async (userId, date, type, reason) => {
    try {
      const collectionRef = collection(db, "salary_requests");
      await addDoc(collectionRef, {
        userId,
        date: date.toISOString().split("T")[0],
        type,
        reason,
        status: "대기 중", // 초기 상태
        createdAt: new Date(),
      });

      alert("정정 신청이 완료되었습니다!");
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("정정 신청 오류:", error);
      alert("정정 신청에 실패했습니다.");
    }
  };

  /**
   * 입력값 검증 후 신청 처리하는 함수
   */
  const handleSubmit = () => {
    if (selectedLeaveType === "유형" || inputValue.trim() === "") {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    handleRegister(userId, yearMonth, selectedLeaveType, inputValue);
  };

  return (
    <>
      {/* 정정 신청 버튼 */}
      <Button onClick={onOpen} className="registerBtn">
        정정 신청
      </Button>
      {isOpen && (
        <Modal
          title="정정 신청"
          content={
            <SalaryRegisterModalContent
              yearMonth={yearMonth}
              selectedLeaveType={selectedLeaveType}
              inputValue={inputValue}
              setYearMonth={setYearMonth}
              setSelectedLeaveType={setSelectedLeaveType}
              setInputValue={setInputValue}
            />
          }
          buttonName="등록하기"
          onSubmit={handleSubmit}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default SalaryRegisterModal;
