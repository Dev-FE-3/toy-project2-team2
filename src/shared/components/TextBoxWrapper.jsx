import { useState } from "react";
import styled from "styled-components";

const TextBoxWrapper = styled.textarea`
  display: flex;
  width: 344px;
  padding: 10px 15px;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 8px;
  align-self: stretch;
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  color: var(--Text-Primary);
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
  pointer-events: ${(props) =>
    props.isSubmitted ? "none" : "auto"}; // 제출된 상태에서는 수정 불가
`;

const TextBox = ({ isSubmitted }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <TextBoxWrapper
      maxLength={100}
      type="text"
      onFocus={handleFocus}
      onBlur={handleBlur}
      isFocused={isFocused}
      isSubmitted={isSubmitted}
      placeholder="내용"
    />
  );
};

export default TextBox;
