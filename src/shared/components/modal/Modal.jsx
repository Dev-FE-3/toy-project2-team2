import styled from "styled-components";
import Button from "../../components/button/Button";
import CancelBtn from "../../../assets/images/cancel.svg";

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
`;

const ModalContainer = styled.div`
  background-color: var(--white);
  width: 400px;
  height: 598px;
  border-radius: 10px;
  border: 1px solid var(--disabled);
  display: flex;
  flex-direction: column;
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

const ModalContent = styled.div`
  flex-grow: 1;
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

const Modal = ({ title, content, hasSubmitButton, isOpen, onClose }) => {
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
        <ModalContent>{content}</ModalContent>
        <ModalFooter>
          <Button size="sm" color="gray" onClick={onClose}>
            닫기
          </Button>
          {hasSubmitButton && <Button size="sm">등록하기</Button>}
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
