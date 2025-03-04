import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../shared/components/button/Button";
import PageTitle from "../../shared/components/titles/PageTitle";
import LoginInput from "../../shared/components/input/LoginInput";
import logo from "./../../assets/images/logo.svg";
import {
  Wrapper,
  LoginBox,
  LoginBoxHeader,
  ErrorWrapper,
  Switcher,
  InputWrapper,
  Logo,
  Error,
  Form,
} from "./auth-component";
import { authErrors } from "./authErrors";
import { handleError } from "./handleError";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    common: "",
    email: "",
  });

  const isDisabled =
    isLoading || email === "" || password === "" || error.common || error.email;

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
      const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        value
      );
      handleError(setError, {
        email: isValid ? "" : "올바른 이메일 형식을 입력하세요.",
        common: "",
      });
    }

    if (name === "password") {
      setPassword(value);
      handleError(setError, { common: "" });
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
        const errorInfo = authErrors[e.code];
        if (errorInfo) {
          setError((prev) => ({
            ...prev,
            [errorInfo.field]: errorInfo.message,
          }));
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
          <PageTitle title="로그인" className="login" />
        </LoginBoxHeader>
        <Form onSubmit={onSubmit}>
          <InputWrapper>
            <LoginInput
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
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>
        </Form>
        <Switcher>
          계정이 없으신가요?
          <Link to="/signup">회원가입</Link>
        </Switcher>
      </LoginBox>
    </Wrapper>
  );
};

export default Login;
