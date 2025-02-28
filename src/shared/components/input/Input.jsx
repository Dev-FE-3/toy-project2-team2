import React from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  align-items: center; /* 수직 정렬 */
  justify-content: space-between;
`;

const Label = styled.label`
  font-size: var(--font-size-primary);
  font-weight: 400;
  color: var(--text-disabled);
  //margin-bottom: 5px;
  display: inline-block;
`;

const InputStyle = styled.input`
  width: 269px;
  height: auto;
  padding: 10px 10px;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: var(--font-size-primary);
  font-weight: 400;
  line-height: 24px;
  border: 1px solid var(--disabled);
  background-color: var(--background-color-3);
  color: var(--text-primary);
  transition: all 0.2s ease;

  &:focus {
    border: 1px solid var(--accent);
    background-color: var(--white);
    color: var(--text-primary);
  }

  ${(props) =>
    props.$issubmitted &&
    `
      border: 1px solid var(--disabled);
      background-color: var(--white);
      color: var(--text-primary);
      pointer-events: none;
    `}
`;

const Input = ({
  id,
  label,
  isSubmitted,
  placeholder = "필요에 의한 내용을 바꿔주세요",
  onChange,
}) => {
  return (
    <InputWrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <InputStyle
        id={id}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        $issubmitted={isSubmitted} // 여기서 'issubmitted'로 전달!!!
      />
    </InputWrapper>
  );
};

export default Input;
