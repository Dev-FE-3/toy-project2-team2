import { styled } from "styled-components";

const InputWrapper = styled.div`
  margin: 0 4px;
`;

const StyledInput = styled.input`
  padding: 0 5px 10px;
  width: 100%;
  font-size: var(--font-size-title-small);
  font-weight: 700;
  letter-spacing: -0.36px;
  color: var(--text-primary);
  border-bottom: 2px solid
    ${(props) => (props.error ? "var(--red)" : "var(--text-disabled-2)")};
  transition: border-bottom 0.3s;
  &:focus {
    border-bottom: 2px solid
      ${(props) => (props.error ? "var(--red)" : "var(--primary)")};
  }
  &::placeholder {
    color: var(--text-disabled-2);
  }
`;

const LoginInput = ({ name, value, onChange, placeholder, type, error }) => {
  return (
    <InputWrapper>
      <StyledInput
        onChange={onChange}
        name={name}
        value={value}
        placeholder={placeholder}
        type={type}
        $error={error}
      />
    </InputWrapper>
  );
};

export default LoginInput;
