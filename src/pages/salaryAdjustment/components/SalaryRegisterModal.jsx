import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../shared/firebase";
import useModal from "../../../shared/components/modal/useModal";
import Modal from "../../../shared/components/modal/Modal";
import Button from "../../../shared/components/Button";
import SelectBox from "../../../shared/components/SelectBox";
import DatePicker from "../../../shared/components/DatePicker";
import TextArea from "../../../shared/components/TextArea";

const leaveOptions = [
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
}) => {
  return (
    <div>
      <label>정정 대상</label>
      <DatePicker type="year-month" value={yearMonth} onChange={setYearMonth} />
      <label>정정 유형</label>
      <SelectBox
        options={leaveOptions}
        defaultOption={selectedLeaveType}
        onSelect={setSelectedLeaveType}
        size="large"
      />
      <TextArea
        id="reason"
        label="정정 사유"
        placeholder="정정 사유를 입력하세요."
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
    </div>
  );
};

const SalaryRegisterModal = ({ userId }) => {
  const { isOpen, onOpen, onClose } = useModal();
  const [yearMonth, setYearMonth] = useState(new Date());
  const [selectedLeaveType, setSelectedLeaveType] = useState("유형");
  const [inputValue, setInputValue] = useState("");

  const handleRegister = async (userId, date, type, reason) => {
    try {
      const collectionRef = collection(db, "salary_requests");
      await addDoc(collectionRef, {
        userId,
        date: date.toISOString().split("T")[0],
        type,
        reason,
        status: "대기 중",
        createdAt: new Date(),
      });

      alert("정정 신청이 완료되었습니다!");
      onClose();
    } catch (error) {
      console.error("정정 신청 오류:", error);
      alert("정정 신청에 실패했습니다.");
    }
  };

  const handleSubmit = () => {
    if (selectedLeaveType === "유형" || inputValue.trim() === "") {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    handleRegister(userId, yearMonth, selectedLeaveType, inputValue);
  };

  return (
    <>
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
          hasSubmitButton={true}
          onSubmit={handleSubmit}
          isOpen={isOpen}
          onClose={onClose}
          SubmitButton={"등록하기"}
        />
      )}
    </>
  );
};
export default SalaryRegisterModal;
