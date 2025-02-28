import { styled } from "styled-components";
import { auth } from "../../firebase";
import { FirebaseError } from "@firebase/util";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../shared/components/button/Button";
import PageTitle from "../../shared/components/titles/PageTitle";
import LoginInput from "../../shared/components/input/LoginInput";
import logo from "./../../assets/images/logo.svg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const errors = {
  "auth/invalid-credential": {
    field: "common",
    message: "이메일 혹은 비밀번호가 잘못되었습니다.",
  },
  "auth/invalid-login-credentials": {
    field: "common",
    message: "이메일 혹은 비밀번호가 잘못되었습니다.",
  },
  "auth/wrong-password": {
    field: "common",
    message: "이메일 혹은 비밀번호가 잘못되었습니다.",
  },
  "auth/user-not-found": {
    field: "common",
    message: "이메일 혹은 비밀번호가 잘못되었습니다.",
  },
};

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
`;

const LoginBox = styled.div`
  height: 650px;
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
  font-weight: 500;
  color: var(--red);
  padding-left: 10px;
  visibility: ${(props) => (props.$hasError ? "visible" : "hidden")};
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

const CreateAccount = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    common: "",
    email: "",
    name: "",
  });
  const [isEmailValid, setEmailValid] = useState(true);

  const isDisabled =
    isLoading ||
    !isEmailValid ||
    email === "" ||
    password === "" ||
    name === "";

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);

      const valid =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
        value === "";
      setEmailValid(valid);

      if (!valid) {
        setError((prev) => ({
          ...prev,
          email: "올바른 이메일 형식을 입력하세요.",
          common: "",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          email: "",
          common: "",
        }));
      }
    } else if (name === "password") {
      setPassword(value);
      setError((prev) => ({
        ...prev,
        common: "",
      }));
    } else if (name === "name") {
      setName(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLoading || !email || !password || !name) return;
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        const errorInfo = errors[e.code];

        if (errorInfo) {
          setError((prev) => {
            const updatedError = { ...prev };

            if (errorInfo.field === "common") {
              updatedError.common = errorInfo.message;
            }

            return updatedError;
          });
        } else {
          alert("예상치 못한 오류가 발생하였습니다.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <LoginBox>
        <LoginBoxHeader>
          <Logo src={logo} alt="Sweet Ten" />
          <PageTitle title="회원가입" className="login" />
        </LoginBoxHeader>
        <Form onSubmit={onSubmit}>
          <InputWrapper>
            <LoginInput
              label={"이름"}
              onChange={onChange}
              name="name"
              value={name}
              placeholder="이름을 입력하세요"
              error={error.name}
            />
            <ErrorWrapper>
              <Error $hasError={!!(error.email || error.common)}>
                {error.name || error.common || " "}
              </Error>
            </ErrorWrapper>
            <LoginInput
              label={"이메일"}
              onChange={onChange}
              name="email"
              value={email}
              placeholder="이메일을 입력하세요"
              error={error.email || error.common}
            />
            <ErrorWrapper>
              <Error $hasError={!!(error.email || error.common)}>
                {error.email || error.common || " "}
              </Error>
            </ErrorWrapper>
            <LoginInput
              label={"비밀번호"}
              onChange={onChange}
              name="password"
              value={password}
              placeholder="비밀번호를 입력하세요"
              type="password"
              error={error.common}
            />
            <ErrorWrapper>
              <Error $hasError={!!error.common}>{error.common || " "}</Error>
            </ErrorWrapper>
          </InputWrapper>
          <Button
            className="loginBtn"
            type="submit"
            size="lg"
            color={isDisabled ? "primary" : undefined}
            disabled={isDisabled}
          >
            {isLoading ? "회원가입 중..." : "회원가입"}
          </Button>
        </Form>
        <Switcher>
          계정이 있으신가요?
          <Link to="/login">로그인</Link>
        </Switcher>
      </LoginBox>
    </Wrapper>
  );
};

export default CreateAccount;
