import { useState } from "react";
import ModalUI from "./ModalUI";

const Modal = ({ title, content, hasSubmitButton, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <span onClick={() => setIsOpen(true)}>{children}</span>

      {isOpen && (
        <ModalUI
          title={title}
          content={content}
          hasSubmitButton={hasSubmitButton}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Modal;
