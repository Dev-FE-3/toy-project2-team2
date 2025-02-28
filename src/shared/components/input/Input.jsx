import React from "react";
import styled from "styled-components";

const InputFieldWrapper = styled.input`
  width: 100%;
  height: auto;
  padding: 10px 10px;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: var(--font-size-primary);
  font-weight: 400;
  line-height: 24px;
  border: 1px solid var(--disabled);
  background-color: var(--background-color-3);
  color: var(--disabled);
  transition: all 0.2s ease;

  &:focus {
    border: 1px solid var(--accent);
    background-color: var(--white);
    color: var(--text-primary);
    outline: none;
  }

  ${(props) =>
    props.isSubmitted &&
    `
      border: 1px solid var(--disabled);
      background-color: var(--white);
      color: var(--Text-Primary);
      pointer-events: none;
    `}
`;

const Input = ({
  isSubmitted,
  placeholder = "필요에 의한 내용을 바꿔주세요",
  onChange,
}) => {
  return (
    <InputFieldWrapper
      type="text"
      isSubmitted={isSubmitted}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
