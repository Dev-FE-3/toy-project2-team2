import styled from "styled-components";
import Button from "../Button";
import CancelBtn from "/images/cancel.svg";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const ModalContainer = styled.div`
  background-color: var(--white);
  width: 400px;
  border-radius: 10px;
  border: 1px solid var(--disabled);
  padding: 30px 28px;
  box-sizing: border-box;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  h1 {
    font-size: var(--font-size-title-small);
    color: var(--text-primary);
    font-weight: 700;
    letter-spacing: -0.36px;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  background-color: transparent;
`;

const CloseIcon = styled.img`
  width: 18px;
  height: 18px;
`;

const Modal = ({
  title, content, buttonName,
  isOpen, onClose,
  onSubmit, onEdit, onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h1>{title}</h1>
          <CloseButton onClick={onClose}>
            <CloseIcon src={CancelBtn} alt="닫기" />
          </CloseButton>
        </ModalHeader>
        <div>{content}</div>
        <ModalFooter>
          <Button
            size="sm"
            color="gray"
            onClick={onDelete ? onDelete : onClose}
          >
            {onDelete ? "삭제" : "닫기"}
          </Button>
          {(onEdit || onSubmit) && (
            <Button
              type={onEdit ? "button" : "submit"}
              size="sm"
              onClick={onEdit || onSubmit}
            >
              {onEdit ? "수정하기" : buttonName}
            </Button>
          )}
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
