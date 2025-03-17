import React, { useEffect } from "react";
import Modal from "../../../shared/components/modal/Modal"; // Modal 컴포넌트 임포트
import useModal from "../../../shared/components/modal/useModal"; // useModal 훅 임포트
import styled from "styled-components";
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

const SalaryHistoryModalContent = ({ selectedRequest }) => {
  return (
    <List>
      <li>
        <label>정정 대상</label>
        <StyledBox>{selectedRequest.date}</StyledBox>
      </li>
      <li>
        <label>정정 유형</label>
        <StyledBox>{selectedRequest.type}</StyledBox>
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

const SalaryHistoryModal = ({ selectedRequest, setSelectedRequest }) => {
  // useModal에 기본값으로 selectedRequest 존재 여부를 전달
  const { isOpen, onOpen, onClose } = useModal({
    defaultOpen: !!selectedRequest,
  });

  if (selectedRequest && !isOpen) {
    onOpen();
  }

  return (
    <>
      <Modal
        title="정정 내역"
        content={
          <SalaryHistoryModalContent selectedRequest={selectedRequest} />
        }
        isOpen={isOpen}
        onClose={() => {
          setSelectedRequest(null);
          onClose(); // 함수는 실행해야 함
        }}
      />
    </>
  );
};

export default SalaryHistoryModal;
