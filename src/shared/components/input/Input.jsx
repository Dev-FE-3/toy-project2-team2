import { useState } from "react";
import styled from "styled-components";

const InputFieldWrapper = styled.input`
  width: 100%; // size fix 아닌 100%로 수정
  height: auto; // size fix 아닌 auto로 수정
  padding: 10px 10px;
  border-radius: 8px;
  box-sizing: border-box;
  color: var(--Text-Primary);
  font-size: var(--font-size-primary);
  font-weight: 400;
  line-height: 24px; /* 150% */
  border: 1px solid
    ${(props) =>
      props.isFocused
        ? "var(--accent)" // 클릭 상태일 때
        : props.isSubmitted
        ? "var(--disabled)" // 제출된 상태일 때
        : "var(--disabled)"}; // 기본 비활성 상태
  background-color: ${(props) =>
    props.isFocused
      ? "var(--white)" // 클릭 상태일 때
      : props.isSubmitted
      ? "var(--white)" // 제출된 상태일 때
      : "var(--background-color-3)"}; // 기본 비활성 상태
  color: ${(props) =>
    props.isFocused
      ? "var(--Text-Primary)" // 클릭 상태일 때
      : props.isSubmitted
      ? "var(--Text-Primary)" // 제출된 상태일 때 (글씨 색상)
      : "var(--disabled)"}; // 기본 비활성 상태
  pointer-events: ${(props) =>
    props.isSubmitted ? "none" : "auto"}; // 제출된 상태에서는 수정 불가
`;

const InputField = ({
  isSubmitted,
  placeholder = "필요에 의한 내용을 바꿔주세요",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <InputFieldWrapper
      type="text"
      onFocus={handleFocus}
      onBlur={handleBlur}
      isFocused={isFocused}
      isSubmitted={isSubmitted}
      placeholder={placeholder}
    />
  );
};

export default InputField;
