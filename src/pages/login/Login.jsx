import { styled } from "styled-components";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "./../../shared/components/button/Button";
import PageTitle from "../../shared/components/titles/PageTitle";
import LoginInput from "./../../shared/components/input/LoginInput";
import logo from "./../../assets/images/logo.svg";

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
  width: 400px;
  /* height: 630px; */
  /* min-width: 300px; */
  /* min-height: 630px; */
  padding: 44px;
  background-color: var(--white);
  border-radius: 12px;
  border: 1px solid var(--disabled);
  box-shadow: 0px 4px 22.4px 0px rgba(0, 0, 0, 0.05);
`;

const Form = styled.form`
  margin-top: 90px;
  /* display: flex;
  flex-direction: column;
  gap: 10px; */
  width: 100%;

  .loginBtn {
    width: 100%;
  }
`;

const Error = styled.span`
  font-size: var(--font-size-small);
  display: inline-block;
  margin-top: 10px;
  font-weight: 600;
  color: var(--red);
  padding-left: 10px;
  height: 18px;
  visibility: ${(props) => (props.$hasError ? "visible" : "hidden")};
`;

const Logo = styled.img`
  width: 112px;
  height: 38px;
`;

const InputWrapper = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px; */
  margin-bottom: 30px;
`;
const Switcher = styled.div`
  color: var(--text-disabled-2);
  text-align: center;
  width: 100%;
  margin-top: 180px;
`;
const InputAndError = styled.div`
  & + & {
    margin-top: 20px;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    common: "",
    email: "",
  });
  const [isEmailValid, setEmailValid] = useState(true);

  const isDisabled =
    isLoading || !isEmailValid || email === "" || password === "";

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);

      const valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        value
      );
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
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLoading || !email || !password) return;
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
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
        <Logo src={logo} alt="Sweet Ten" />
        <PageTitle title="로그인" className="login" />
        <Form onSubmit={onSubmit}>
          <InputWrapper>
            <InputAndError>
              <LoginInput
                onChange={onChange}
                name="email"
                value={email}
                placeholder="Email"
                error={error.email || error.common}
              />
              <Error $hasError={!!(error.email || error.common)}>
                {error.email || error.common || " "}
              </Error>
            </InputAndError>
            <InputAndError>
              <LoginInput
                onChange={onChange}
                name="password"
                value={password}
                placeholder="Password"
                type="password"
                error={error.common}
              />
              <Error $hasError={!!error.common}>{error.common || " "}</Error>
            </InputAndError>
          </InputWrapper>

          <Button
            className="loginBtn"
            type="submit"
            size="lg"
            color={isDisabled ? "primary" : undefined}
            disabled={isDisabled}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>
        </Form>
        <Switcher>
          계정이 없으신가요?&nbsp;&nbsp;
          <Link to="/">회원가입</Link>
        </Switcher>
      </LoginBox>
    </Wrapper>
  );
};

export default Login;
