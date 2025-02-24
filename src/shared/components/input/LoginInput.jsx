import { styled } from "styled-components";

const InputWrapper = styled.div`
  margin-left: 11px;
  margin-right: 11px;
`;

const StyledInput = styled.input`
  padding: 0 0 20px 0;
  border: none;
  width: 100%;
  max-width: 100%;
  height: auto;
  font-size: var(--font-size-title-small);
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.36px;
  margin-bottom: 20px;
  color: var(--text-primary);
  box-sizing: border-box;
  border-bottom: 2px solid var(--text-disabled-2);
  &::placeholder {
    color: var(--text-disabled-2);
  }
`;

const LoginInput = ({ name, value, onChange, placeholder, type }) => {
  return (
    <InputWrapper>
      <StyledInput
        onChange={onChange}
        name={name}
        value={value}
        placeholder={placeholder}
        type={type}
        required
      />
    </InputWrapper>
  );
};

export default LoginInput;
//export default { InputWrapper, Input };
