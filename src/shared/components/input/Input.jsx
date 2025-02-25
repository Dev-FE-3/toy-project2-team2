import styled from "styled-components";

const InputFieldWrapper = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  box-sizing: border-box;
  color: var(--text-primary);
  font-size: var(--font-size-primary);
  font-weight: 400;
  line-height: 24px;
  background-color: var(--background-color-3);
  border: 1px solid var(--disabled);

  &:focus {
    border-color: var(--accent);
    background-color: var(--white);
  }

  &:disabled {
    background-color: var(--white);
    pointer-events: none;
  }
`;

const InputField = ({
  disabled,
  placeholder = "필요에 의한 내용을 바꿔주세요",
}) => {
  return (
    <>
      <InputFieldWrapper
        type="text"
        disabled={disabled}
        placeholder={placeholder}
      />
    </>
  );
};

export default InputField;
