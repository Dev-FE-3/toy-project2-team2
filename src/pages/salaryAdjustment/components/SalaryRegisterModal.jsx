import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../shared/firebase";
import styled from "styled-components";
import useModal from "../../../shared/components/modal/useModal";
import Modal from "../../../shared/components/modal/Modal";
import Button from "../../../shared/components/Button";
import SelectBox from "../../../shared/components/SelectBox";
import DatePicker from "../../../shared/components/DatePicker";
import TextArea from "../../../shared/components/TextArea";
import { toast } from "react-toastify";

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

const LEAVE_OPTIONS = [
  "유급 휴가",
  "무급 휴가",
  "업무 연장",
  "휴일 근무",
  "연차",
  "병가",
];

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
        <label>정정 대상</label>
        <DatePicker
          type="year-month"
          value={yearMonth}
          onChange={setYearMonth}
          isSubmitted={isSubmitted}
        />
      </li>
      <li>
        <label>정정 유형</label>
        <SelectBox
          options={LEAVE_OPTIONS}
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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedLeaveType, setSelectedLeaveType] = useState("유형");
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async () => {
    if (selectedLeaveType === "유형" || inputValue.trim() === "") {
      toast.warn("모든 항목을 입력해주세요.");
      return;
    }

    try {
      const collectionRef = collection(db, "salary_requests");
      await addDoc(collectionRef, {
        userId,
        date: currentDate.toISOString().split("T")[0],
        type: selectedLeaveType,
        reason: inputValue,
        status: "대기 중",
        createdAt: new Date(),
        userName,
        userEmployeeId,
      });

      toast.success("정정 신청이 완료되었습니다!");
      onClose();
    } catch (error) {
      console.error("정정 신청 오류:", error);
      toast.error("정정 신청에 실패했습니다.");
    }
  };

  return (
    <>
      {/* 정정 신청 버튼 */}
      <Button
        onClick={() => {
          {
            /*상태 초기화*/
          }
          setCurrentDate(new Date());
          setInputValue("");
          setSelectedLeaveType("유형");
          onOpen();
        }}
        className="registerBtn"
      >
        정정 신청
      </Button>

      <Modal
        title="정정 신청"
        content={
          <SalaryRegisterModalContent
            currentDate={currentDate}
            selectedLeaveType={selectedLeaveType}
            inputValue={inputValue}
            setCurrentDate={setCurrentDate}
            setSelectedLeaveType={setSelectedLeaveType}
            setInputValue={setInputValue}
          />
        }
        buttonName="등록하기"
        // hasSubmitButton={true}
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
export default SalaryRegisterModal;
