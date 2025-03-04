import { useState, useCallback } from "react";
// import useOnClickOutside from "./useOnClickOutside";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const modalRef = useRef(null);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  // useOnClickOutside(modalRef, onClose); // 모달 바깥 클릭 시 닫힘

  return { isOpen, onOpen, onClose };
};

export default useModal;
