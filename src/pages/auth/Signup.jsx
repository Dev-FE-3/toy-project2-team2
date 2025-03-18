import { auth, db } from "../../shared/firebase";
import { FirebaseError } from "@firebase/util";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { AUTH_ERRORS } from "./constant/AUTH_ERRORS";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { handleError } from "./util/handleError";
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
import PageTitle from "../../shared/components/PageTitle";
import Button from "../../shared/components/Button";
import styled from "styled-components";
import SelectBox from "../../shared/components/SelectBox";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../store/userSlice";
import { toast } from "react-toastify";
import useSignupForm from "./hooks/useSignupForm";

const UserInfoWrapper = styled.div`
  gap: 20px;
  display: flex;
  padding: 0 4px;
`;

const InputBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-left: 4px;
  div {
    margin-top: 14px;
  }
  .selectError {
    margin: 0;
  }
`;

const DEFAULT_USER_LOCATION = "지점 선택";
const DEFAULT_USER_POSITION = "직급 선택";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [randomNum, setRandomNum] = useState(null);
  const {
    email,
    password,
    name,
    position,
    location,
    error,
    onChangeEmail,
    onChangePassword,
    onChangeName,
    setPosition,
    setLocation,
    setError,
  } = useSignupForm();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);
  useEffect(() => {
    setRandomNum(Math.floor(10000000 + Math.random() * 90000000));
  }, []);

  const isDisabled =
    isLoading ||
    email === "" ||
    password === "" ||
    name === "" ||
    error.email ||
    error.password ||
    error.name ||
    error.location ||
    error.position;

  const handleSelect = (name, value, defaultValue) => {
    if (value !== defaultValue) {
      handleError(setError, { [name]: "" });
    }

    if (name === "location") {
      setLocation(value);
    } else if (name === "position") {
      setPosition(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;
    if (
      location === DEFAULT_USER_LOCATION ||
      position === DEFAULT_USER_POSITION
    ) {
      if (location === DEFAULT_USER_LOCATION) {
        handleError(setError, {
          location: "지점을 선택하세요",
        });
      }
      if (position === DEFAULT_USER_POSITION) {
        handleError(setError, {
          position: "직급을 선택하세요",
        });
      }
      return;
    }
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser; // 회원가입 후 로그인된 상태에서 auth.currentUser가 존재

      await setDoc(doc(db, "users", auth.currentUser.uid), {
        employeeId: randomNum,
        hiredDate: Timestamp.now(),
        location: location,
        name: name,
        position: position,
      });

      // Firebase에서 로그인된 유저 정보를 Redux 상태에 저장
      dispatch(
        setUserInfo({
          uid: user.uid,
          email: user.email,
          name: name,
          location: location,
          position: position,
          hiredDate: Timestamp.now(),
          employeeId: randomNum,
        })
      );

      toast.success(`${name} 님 회원이 되신 것을 환영합니다.`);
    } catch (e) {
      if (e instanceof FirebaseError) {
        const errorInfo = AUTH_ERRORS[e.code];
        if (errorInfo) {
          setError((prev) => ({
            ...prev,
            [errorInfo.name]: errorInfo.message,
          }));
        } else {
          toast.error("예상치 못한 오류가 발생하였습니다.");
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
              id="name"
              label={"이름"}
              onChange={onChangeName}
              name="name"
              value={name}
              placeholder="김스텐"
              error={error.name}
              maxLength="10"
            />
            <ErrorWrapper>
              <Error hasError={!!error.name}>{error.name || " "}</Error>
            </ErrorWrapper>
            <UserInfoWrapper>
              <InputBox>
                <SelectBox
                  id="position"
                  value={position}
                  name="position"
                  onSelect={(value) =>
                    handleSelect("position", value, DEFAULT_USER_POSITION)
                  }
                  label={"직급"}
                  size="autoSmall"
                  options={["메이트", "트레이너"]}
                  defaultOption={position}
                  error={error.position}
                />
                <ErrorWrapper className="selectError">
                  <Error hasError={!!error.position}>{error.position}</Error>
                </ErrorWrapper>
              </InputBox>
              <InputBox>
                <SelectBox
                  id="location"
                  value={location}
                  name="location"
                  onSelect={(value) =>
                    handleSelect("location", value, DEFAULT_USER_LOCATION)
                  }
                  label={"지점"}
                  size="autoSmall"
                  options={["광복점", "서면점"]}
                  defaultOption={location}
                  error={error.location}
                />
                <ErrorWrapper className="selectError">
                  <Error hasError={!!error.location}>{error.location}</Error>
                </ErrorWrapper>
              </InputBox>
            </UserInfoWrapper>
            <LoginInput
              id="email"
              label={"이메일"}
              onChange={onChangeEmail}
              name="email"
              value={email}
              placeholder="sweetten@xxxx.xxx"
              error={error.email}
            />
            <ErrorWrapper>
              <Error hasError={!!error.email}>{error.email || " "}</Error>
            </ErrorWrapper>
            <LoginInput
              id="password"
              label={"비밀번호"}
              onChange={onChangePassword}
              name="password"
              value={password}
              placeholder="특수기호를 포함하여 6자 이상"
              type="password"
              error={error.password}
              minLength="6"
            />
            <ErrorWrapper>
              <Error hasError={!!error.password}>{error.password || " "}</Error>
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
