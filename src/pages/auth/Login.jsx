import { auth } from "../../shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AUTH_ERRORS } from "./constant/AUTH_ERRORS";
import { FirebaseError } from "@firebase/util";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "/images/logo.svg";
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
} from "./components/auth-component";
import LoginInput from "./components/LoginInput";
import Button from "../../shared/components/Button";
import PageTitle from "../../shared/components/PageTitle";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../store/userSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../shared/firebase";
import { Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import useLoginForm from "./hooks/useLoginForm";

const Login = () => {
  const dispatch = useDispatch(); // 추가
  const navigate = useNavigate();
  const { email, password, error, onChangeEmail, onChangePassword, setError } =
    useLoginForm();
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled =
    isLoading ||
    email === "" ||
    password === "" ||
    error.loginError ||
    error.email;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // Firestore에서 해당 유저의 정보 가져오기
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        if (userData.hiredDate instanceof Timestamp) {
          userData.hiredDate = new Date(
            userData.hiredDate.seconds * 1000
          ).toISOString();
        }

        // Redux에 전체 정보 저장
        dispatch(setUserInfo({ uid: user.uid, ...userData }));
        toast.success(`${userData.name}님 반갑습니다.`);
      } else {
        console.warn("사용자 정보가 Firestore에 없음.");
      }

      navigate("/");
    } catch (e) {
      console.error("로그인 실패:", e); // 🔥 에러 로그 확인
      if (e instanceof FirebaseError) {
        const errorInfo = AUTH_ERRORS[e.code];
        if (errorInfo) {
          setError((prev) => ({
            ...prev,
            [errorInfo.field]: errorInfo.message,
          }));
        } else {
          toast.warning("예상치 못한 오류가 발생하였습니다.");
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
              id="email"
              onChange={onChangeEmail}
              name="email"
              value={email}
              placeholder="이메일을 입력하세요"
              error={error.email || error.loginError}
            />
            <ErrorWrapper>
              <Error hasError={!!(error.email || error.loginError)}>
                {error.email || error.loginError || " "}
              </Error>
            </ErrorWrapper>
            <LoginInput
              id="password"
              onChange={onChangePassword}
              name="password"
              value={password}
              placeholder="비밀번호를 입력하세요"
              type="password"
              error={error.loginError}
            />
            <ErrorWrapper>
              <Error hasError={!!error.loginError}>
                {error.loginError || " "}
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
