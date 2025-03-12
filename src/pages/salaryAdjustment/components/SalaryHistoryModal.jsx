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
        <span>정정 대상</span>
        <StyledBox id="salary-date">
          {selectedRequest.date.split("-").slice(0, 2).join(" / ")}
        </StyledBox>
      </li>
      <li>
        <span>정정 유형</span>
        <StyledBox id="salary-type">{selectedRequest.type}</StyledBox>
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
  const { isOpen, onOpen, onClose } = useModal();

  useEffect(() => {
    if (selectedRequest) {
      onOpen(); // selectedRequest가 존재하면 모달을 연다.
    }
  }, [selectedRequest, onOpen]);

  // isOpen 상태가 true일 때만 모달을 표시하도록
  return (
    <>
      {isOpen && selectedRequest && (
        <Modal
          title="정정 내역"
          content={
            <SalaryHistoryModalContent
              setSelectedRequest={setSelectedRequest}
              selectedRequest={selectedRequest}
            />
          }
          isOpen={isOpen}
          onClose={() => {
            setSelectedRequest(null);
            onClose;
          }}
        />
      )}
    </>
  );
};

export default SalaryHistoryModal;
