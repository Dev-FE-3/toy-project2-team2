import { useState } from "react";
import styled from "styled-components";

const InputFieldWrapper = styled.input`
  display: flex;
  width: 269px;
  height: 38px;
  padding: 10px 10px;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 8px;
  box-sizing: border-box;
  align-self: stretch;
  border: 1px solid
    ${(props) =>
      props.isFocused
        ? "var(--accent)" // 클릭 상태일 때
        : props.isSubmitted
        ? "var(--disabled)" // 제출된 상태일 때
        : "var(--disabled)"}; // 기본 비활성 상태
  background: ${(props) =>
    props.isFocused
      ? "var(--white)" // 클릭 상태일 때
      : props.isSubmitted
      ? "var(--white)" // 제출된 상태일 때
      : "var(--background-color-3)"}; // 기본 비활성 상태
  pointer-events: ${(props) =>
    props.isSubmitted ? "none" : "auto"}; // 제출된 상태에서는 수정 불가
`;

const InputField = ({ isSubmitted }) => {
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
      placeholder="제목"
    />
  );
};

export default InputField;
