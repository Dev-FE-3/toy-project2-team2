import { styled } from "styled-components";

const InputWrapper = styled.div`
  margin-left: 11px;
  margin-right: 11px;
`;

const StyledInput = styled.input`
  padding-bottom: 20px;
  margin-bottom: 20px;
  width: 100%;
  font-size: var(--font-size-title-small);
  font-weight: 700;
  letter-spacing: -0.36px;
  color: var(--text-primary);
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
