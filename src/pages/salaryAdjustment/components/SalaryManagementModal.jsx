import React, { useEffect, useState } from "react";
import Modal from "../../../shared/components/modal/Modal"; // Modal 컴포넌트 임포트
import useModal from "../../../shared/components/modal/useModal"; // useModal 훅 임포트
import styled from "styled-components";
import TextArea from "../../../shared/components/TextArea";
import SelectBox from "../../../shared/components/SelectBox";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../shared/firebase";
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

const StyledBox = styled.div`
  width: 170px;
  padding: 12px 16px;
  border: 1px solid var(--disabled);
  border-radius: 8px;
  background-color: var(--background-color-3);
  font-weight: 400;
  box-sizing: border-box;
  color: var(--text-primary);
`;

const SalaryManagementModalContent = ({
  selectedRequest,
  updatedStatus,
  userName,
  userEmployeeId,
  setUpdatedStatus,
}) => {
  return (
    <List>
      <li>
        <label>이름/사번</label>
        <StyledBox>{`${userName} / ${userEmployeeId}`}</StyledBox>
      </li>
      <li>
        <label>정정 대상</label>
        <StyledBox>{selectedRequest.date}</StyledBox>
      </li>
      <li>
        <label>정정 유형</label>
        <StyledBox>{selectedRequest.type}</StyledBox>
      </li>
      <li>
        <label>정정 상태</label>
        <SelectBox
          options={["대기 중", "정정 완료", "정정 불가"]}
          defaultOption={updatedStatus}
          onSelect={setUpdatedStatus}
          size="large"
        />
      </li>
      <li className="textarea">
        <TextArea
          rows={5}
          label="정정 사유"
          id="reason"
          isSubmitted={true}
          placeholder={selectedRequest.reason}
        />
      </li>
    </List>
  );
};

const SalaryManagementModal = ({
  setSelectedRequest,
  selectedRequest,
  userName,
  userEmployeeId,
}) => {
  const { isOpen, onOpen, onClose } = useModal();
  const [updatedStatus, setUpdatedStatus] = useState(
    selectedRequest?.status || "대기 중"
  );
  if (selectedRequest && !isOpen) {
    onOpen();
  }

  const handleSubmit = async () => {
    try {
      const docRef = doc(db, "salary_requests", selectedRequest.id);
      await updateDoc(docRef, { status: updatedStatus });

      toast.success("처리 상태 수정이 완료되었습니다.");
      setSelectedRequest(null); // 모달 닫기 전에 selectedRequest 초기화
      onClose();
    } catch (error) {
      console.error("처리 상태 수정 오류:", error);
      toast.error("처리 상태 수정에 실패했습니다.");
    }
  };

  return (
    <>
      <Modal
        title="정정 내역"
        content={
          <SalaryManagementModalContent
            selectedRequest={selectedRequest}
            updatedStatus={updatedStatus}
            setUpdatedStatus={setUpdatedStatus}
            userName={userName}
            userEmployeeId={userEmployeeId}
          />
        }
        onSubmit={handleSubmit}
        buttonName="저장하기"
        isOpen={isOpen}
        onClose={() => {
          setSelectedRequest(null);
          onClose();
        }}
      />
    </>
  );
};

export default SalaryManagementModal;
