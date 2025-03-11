import React, { useEffect, useState } from "react";
import Modal from "../../../shared/components/modal/Modal"; // Modal 컴포넌트 임포트
import useModal from "../../../shared/components/modal/useModal"; // useModal 훅 임포트
import styled from "styled-components";
import TextArea from "../../../shared/components/TextArea";
import SelectBox from "../../../shared/components/SelectBox";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../shared/firebase";

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
  padding: 12px 16px; // 내부 여백 추가
  border: 1px solid var(--disabled); // 테두리 추가
  border-radius: 8px; // 둥근 모서리 적용
  background-color: var(--background-color-3);
  font-weight: 400;
  box-sizing: border-box;
  color: var(--text-primary);
`;

const SalaryManagementModalContent = ({
  selectedRequest,
  updatedStatus,
  name,
  employeeId,
  setUpdatedStatus,
}) => {
  return (
    <List>
      <li>
        <label htmlFor="salary-date">이름/사번</label>
        <StyledBox id="salary-date">{`${name} / ${employeeId}`}</StyledBox>
      </li>
      <li>
        <label htmlFor="salary-date">정정 대상</label>
        <StyledBox id="salary-date">{selectedRequest.date}</StyledBox>
      </li>
      <li>
        <label htmlFor="salary-type">정정 유형</label>
        <StyledBox id="salary-type">{selectedRequest.type}</StyledBox>
      </li>
      <li>
        <label htmlFor="salary-type">정정 상태</label>
        <SelectBox
          id="salary-type"
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
  name,
  employeeId,
}) => {
  const { isOpen, onOpen, onClose } = useModal();
  const [updatedStatus, setUpdatedStatus] = useState(selectedRequest.status);

  useEffect(() => {
    if (selectedRequest) {
      setUpdatedStatus(selectedRequest.status); // 새로운 요청이 들어올 때 상태 업데이트
      onOpen(); // 모달 열기
    }
  }, [selectedRequest, onOpen]);

  const handleStatus = async (updatedStatus) => {
    try {
      const docRef = doc(db, "salary_requests", selectedRequest.id);
      await updateDoc(docRef, {
        status: updatedStatus,
      });

      alert("처리 상태 수정이 완료되었습니다.");
      onClose();
    } catch (error) {
      console.error("처리 상태 수정 오류:", error);
      alert("처리 상태 수정에 실패했습니다.");
    }
  };

  const handleSubmit = () => {
    handleStatus(updatedStatus);
  };
  // isOpen 상태가 true일 때만 모달을 표시하도록
  return (
    <>
      {isOpen && selectedRequest && (
        <Modal
          title="정정 내역"
          content={
            <SalaryManagementModalContent
              setSelectedRequest={setSelectedRequest}
              selectedRequest={selectedRequest}
              updatedStatus={updatedStatus}
              setUpdatedStatus={setUpdatedStatus}
              name={name}
              employeeId={employeeId}
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
      )}
    </>
  );
};

export default SalaryManagementModal;
