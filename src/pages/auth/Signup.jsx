import { auth, db } from "../../firebase";
import { FirebaseError } from "@firebase/util";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../shared/components/button/Button";
import PageTitle from "../../shared/components/titles/PageTitle";
import LoginInput from "../../shared/components/input/LoginInput";
import logo from "./../../assets/images/logo.svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
import { addDoc, collection } from "firebase/firestore";
import { authErrors } from "./authErrors";
import { handleError } from "./handleError";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    name: "",
  });

  const isDisabled =
    isLoading ||
    email === "" ||
    password === "" ||
    name === "" ||
    error.email ||
    error.password ||
    error.name;

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
      const isValid =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
        value === "";
      handleError(setError, {
        email: isValid ? "" : "올바른 이메일 형식을 입력하세요.",
      });
    }

    if (name === "password") {
      setPassword(value);
      const isValid =
        (value.length > 6 && /[!@#$%^&*(),.?":{}|<>]/.test(value)) ||
        value === "";
      handleError(setError, {
        password: isValid
          ? ""
          : "비밀번호는 특수기호를 포함하여 6자 이상이어야 합니다.",
      });
    }

    if (name === "name") {
      setName(value);
      const isValid = /^[a-zA-Z가-힣]+$/.test(value) || value === "";
      handleError(setError, {
        name: isValid
          ? ""
          : "이름에는 특수기호와 숫자, 공백을 포함할 수 없습니다.",
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLoading || !email || !password || !name) return;
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "users"), {
        employeeId: "",
        hiredDate: null,
        location: "",
        name: name,
        position: "",
      });
      navigate("/");
      alert(`${name} 님 회원이 되신 것을 환영합니다.`);
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
          <PageTitle title="회원가입" className="login" />
        </LoginBoxHeader>
        <Form onSubmit={onSubmit}>
          <InputWrapper>
            <LoginInput
              label={"이름"}
              onChange={onChange}
              name="name"
              value={name}
              placeholder="김스텐"
              error={error.name}
              maxLength="10"
            />
            <ErrorWrapper>
              <Error $hasError={!!error.name}>{error.name || " "}</Error>
            </ErrorWrapper>
            <LoginInput
              label={"이메일"}
              onChange={onChange}
              name="email"
              value={email}
              placeholder="sweetTen@xxxx.xxx"
              error={error.email}
            />
            <ErrorWrapper>
              <Error $hasError={!!error.email}>{error.email || " "}</Error>
            </ErrorWrapper>
            <LoginInput
              label={"비밀번호"}
              onChange={onChange}
              name="password"
              value={password}
              placeholder="특수기호를 포함하여 6자 이상"
              type="password"
              error={error.password}
              minLength="6"
            />
            <ErrorWrapper>
              <Error $hasError={!!error.password}>
                {error.password || " "}
              </Error>
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

export default Signup;
