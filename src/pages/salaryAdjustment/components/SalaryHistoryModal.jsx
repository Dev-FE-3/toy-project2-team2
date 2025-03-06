import React, { useEffect } from "react";
import Modal from "../../../shared/components/modal/Modal"; // Modal 컴포넌트 임포트
import useModal from "../../../shared/components/modal/useModal"; // useModal 훅 임포트

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
          title="정정 내역 확인"
          content={
            <div>
              <p>
                <strong>정정 대상:</strong> {selectedRequest.date}
              </p>
              <p>
                <strong>정정 유형:</strong> {selectedRequest.type}
              </p>
              <p>
                <strong>정정 사유:</strong> {selectedRequest.reason}
              </p>
              <p>
                <strong>처리 상태:</strong> {selectedRequest.status}
              </p>
            </div>
          }
          hasSubmitButton={false}
          isOpen={isOpen} // 모달이 열리도록 상태 전달
          onClose={onClose} // 모달 닫기 기능
        />
      )}
    </>
  );
};

export default SalaryHistoryModal;
