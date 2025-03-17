import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
`;

const LoginBox = styled.div`
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  padding: 44px;
  background-color: var(--white);
  border-radius: 12px;
  border: 1px solid var(--disabled);
  box-shadow: 0px 4px 22.4px 0px rgba(0, 0, 0, 0.05);
`;

const Form = styled.form`
  width: 100%;

  .loginBtn {
    width: 100%;
  }
`;

const Error = styled.span`
  font-size: var(--font-size-small);
  color: var(--red);
  padding-left: 10px;
  visibility: ${(props) => (props.hasError ? "visible" : "hidden")};
`;

const Logo = styled.img`
  width: 112px;
  height: 38px;
`;

const InputWrapper = styled.div`
  margin-bottom: 10px;
  input {
    margin-top: 14px;
  }
`;
const Switcher = styled.div`
  color: var(--text-disabled-2);
  text-align: center;
  width: 100%;
  a {
    margin-left: 5px;
    color: var(--text-primary);
  }
`;
const ErrorWrapper = styled.div`
  padding-top: 5px;
  height: 34px;
`;
const LoginBoxHeader = styled.div``;

export {
  Wrapper,
  LoginBox,
  LoginBoxHeader,
  ErrorWrapper,
  Switcher,
  InputWrapper,
  Logo,
  Error,
  Form,
};
