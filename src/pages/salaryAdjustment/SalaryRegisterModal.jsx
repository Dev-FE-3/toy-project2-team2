import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../shared/firebase";
import useModal from "../../shared/components/modal/useModal";
import Modal from "../../shared/components/modal/Modal";
import Button from "../../shared/components/Button";
import SelectBox from "../../shared/components/SelectBox";
import DatePicker from "../../shared/components/DatePicker";
import TextArea from "../../shared/components/TextArea";

const leaveOptions = ["유급휴가", "무급휴가", "연차", "병가", "기타"];

const SalaryRegisterModal = ({ userId }) => {
  const { isOpen, onOpen, onClose } = useModal();
  const [yearMonth, setYearMonth] = useState(new Date());
  const [selectedLeaveType, setSelectedLeaveType] = useState("유형");
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async () => {
    if (selectedLeaveType === "유형" || !inputValue.trim()) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      await addDoc(collection(db, "salary_requests"), {
        userId,
        date: yearMonth.toISOString().split("T")[0],
        type: selectedLeaveType,
        reason: inputValue,
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

  return (
    <>
      <Button onClick={onOpen} className="registerBtn">
        정정 신청
      </Button>
      {isOpen && (
        <Modal
          title="정정 신청"
          content={
            <>
              <DatePicker
                type="year-month"
                value={yearMonth}
                onChange={setYearMonth}
              />
              <SelectBox
                options={leaveOptions}
                onSelect={setSelectedLeaveType}
              />
              <TextArea
                label="정정 사유"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </>
          }
          hasSubmitButton
          onSubmit={handleSubmit}
          onClose={onClose}
          SubmitButton="등록하기"
        />
      )}
    </>
  );
};

export default SalaryRegisterModal;
