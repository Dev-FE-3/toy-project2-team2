import { useState } from "react";
import styled from "styled-components";

const TextBoxWrapper = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 10px 15px;
  border-radius: 8px;
  color: var(--Text-Primary);
  font-size: var(--font-size-primary);
  font-weight: 400;
  font-style: normal;
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
      maxLength={100} // 우선 100 설정
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
