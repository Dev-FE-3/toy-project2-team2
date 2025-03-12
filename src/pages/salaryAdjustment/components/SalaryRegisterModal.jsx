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
        <DatePicker
          id="salary-date"
          label="정정 대상"
          type="year-month"
          value={yearMonth}
          onChange={setYearMonth}
          isSubmitted={isSubmitted}
        />
      </li>
      <li>
        <SelectBox
          id="salary-type"
          label="정정 유형"
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

const SalaryRegisterModal = ({ userName, userId, userEmployeeId }) => {
  const { isOpen, onOpen, onClose } = useModal();
  const [yearMonth, setYearMonth] = useState(new Date());
  const [selectedLeaveType, setSelectedLeaveType] = useState("유형");
  const [inputValue, setInputValue] = useState("");

  const handleRegister = async (
    userId,
    date,
    type,
    reason,
    userName,
    userEmployeeId
  ) => {
    try {
      const collectionRef = collection(db, "salary_requests");
      await addDoc(collectionRef, {
        userId,
        date: date.toISOString().split("T")[0],
        type,
        reason,
        status: "대기 중",
        createdAt: new Date(),
        userName,
        userEmployeeId,
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
    handleRegister(
      userId,
      yearMonth,
      selectedLeaveType,
      inputValue,
      userName,
      userEmployeeId
    );
  };

  return (
    <>
      {/* 정정 신청 버튼 */}
      <Button
        onClick={() => {
          {
            /*상태 초기화*/
          }
          setYearMonth(new Date());
          setInputValue("");
          setSelectedLeaveType("유형");
          onOpen();
        }}
        className="registerBtn"
      >
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
