import React, { useEffect } from "react";
import Modal from "../../../shared/components/modal/Modal"; // Modal 컴포넌트 임포트
import useModal from "../../../shared/components/modal/useModal"; // useModal 훅 임포트
import styled from "styled-components";
import TextArea from "../../../shared/components/TextArea";

const List = styled.dl`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  dt {
    width: 20%;
    margin-top: 20px;

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      width: 100%;
    }

    label {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      color: var(--text-disabled);
    }
  }

  dd {
    width: 80%;
    margin-top: 20px;

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      width: 100%;
      height: 118px;
      margin-top: 16px;
      margin-bottom: 100px;
    }
  }
`;

const StyledBox = styled.div`
  width: 170px;
  padding: 12px 16px; // 내부 여백 추가
  border: 1px solid var(--disabled); // 테두리 추가
  border-radius: 8px; // 둥근 모서리 적용
  background-color: var(--white); // 연한 배경색 추가
  font-weight: 400;
  box-sizing: border-box;
  color: var(--text-primary);
`;

const SalaryHistoryModal = ({ selectedRequest }) => {
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
            <List>
              <dt>
                <label htmlFor="salary-date">정정 대상</label>
              </dt>
              <StyledBox id="salary-date">{selectedRequest.date}</StyledBox>

              <dt>
                <label htmlFor="salary-type">정정 유형</label>
              </dt>
              <StyledBox id="salary-type">{selectedRequest.type}</StyledBox>

              <dd>
                <TextArea
                  rows={5}
                  label="정정 사유"
                  id="reason"
                  isSubmitted={true} // 제출된 상태를 의미하는 프로퍼티
                  placeholder={selectedRequest.reason}
                />
              </dd>
            </List>
          }
          // hasSubmitButton={false}
          isOpen={isOpen} // 모달이 열리도록 상태 전달
          onClose={onClose} // 모달 닫기 기능
        />
      )}
    </>
  );
};

export default SalaryHistoryModal;
