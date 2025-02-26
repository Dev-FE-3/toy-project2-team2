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
  height: 630px;
  min-width: 380px;
  min-height: 630px;
  padding: 44px;
  background-color: var(--white);
  border-radius: 12px;
  border: 1px solid var(--disabled);
  box-shadow: 0px 4px 22.4px 0px rgba(0, 0, 0, 0.05);
`;

const Form = styled.form`
  margin-top: 90px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Error = styled.span`
  font-weight: 600;
  color: var(--red);
`;

const Logo = styled.img`
  width: 112px;
  height: 38px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
  margin-bottom: 30px;
`;
const Switcher = styled.div`
  color: var(--text-disabled-2);
  text-align: center;
  width: 100%;
  margin-top: 180px;
`;

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isDisabled = isLoading || email === "" || password === "";

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "password") {
      setPassword(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isDisabled) return;
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.message);
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
    // create an account
    // set name of the user profile
    // redirect to home page
  };

  return (
    <Wrapper>
      <LoginBox>
        <Logo src={logo} alt="Sweet Ten" />
        <PageTitle title="로그인" className="login" />
        <Form onSubmit={onSubmit}>
          <InputWrapper>
            <LoginInput
              onChange={onChange}
              name="email"
              value={email}
              placeholder="Email"
              type="email"
              required
            />
            <LoginInput
              onChange={onChange}
              name="password"
              value={password}
              placeholder="Password"
              type="password"
              required
            />
          </InputWrapper>
          <Button
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
