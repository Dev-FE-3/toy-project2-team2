import { useState } from "react";
import ModalUI from "./ModalUI";

const Modal = ({ title, content, hasSubmitButton, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>{children}</button>

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
