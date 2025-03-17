import { auth, db } from "../../shared/firebase";
import { FirebaseError } from "@firebase/util";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { authErrors } from "./constant/authErrors";
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

const Signup = () => {
  const dispatch = useDispatch();

  const placeholder = {
    location: "지점 선택",
    position: "직급 선택",
    name: "김스텐",
    password: "특수기호를 포함하여 6자 이상",
    email: "sweetten@xxxx.xxx",
  };

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [randomNum, setRandomNum] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    position: placeholder.position,
    location: placeholder.location,
  });
  const [error, setError] = useState({
    email: "",
    name: "",
    location: "",
    position: "",
  });

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

  const handleSelect = (name, value) => {
    setUserData((prev) => ({ ...prev, [name]: value }));
    if (value !== placeholder[name]) {
      handleError(setError, { [name]: "" });
    }
  };

  const isDisabled =
    isLoading ||
    userData.email === "" ||
    userData.password === "" ||
    userData.name === "" ||
    error.email ||
    error.password ||
    error.name ||
    error.location;

  const validSignupInput = (name, value) => {
    let isValid = true;
    if (name === "email") {
      isValid =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
        value === "";
      handleError(setError, {
        email: isValid ? "" : "올바른 이메일 형식을 입력하세요.",
      });
    }

    if (name === "password") {
      isValid =
        (value.length > 6 && /[!@#$%^&*(),.?":{}|<>]/.test(value)) ||
        value === "";
      handleError(setError, {
        password: isValid
          ? ""
          : "비밀번호는 특수기호를 포함하여 6자 이상이어야 합니다.",
      });
    }

    if (name === "name") {
      isValid = /^[a-zA-Z가-힣]+$/.test(value) || value === "";
      handleError(setError, {
        name: isValid
          ? ""
          : "이름에는 특수기호와 숫자, 공백을 포함할 수 없습니다.",
      });
    }
  };

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setUserData((prev) => ({ ...prev, [name]: value }));
    validSignupInput(name, value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;
    if (
      userData.location === placeholder.location ||
      userData.position === placeholder.position
    ) {
      if (userData.location === placeholder.location) {
        handleError(setError, {
          location: "지점을 선택하세요",
        });
      }
      if (userData.position === placeholder.position) {
        handleError(setError, {
          position: "직급을 선택하세요",
        });
      }
      return;
    }
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      const user = auth.currentUser; // 회원가입 후 로그인된 상태에서 auth.currentUser가 존재

      await setDoc(doc(db, "users", auth.currentUser.uid), {
        employeeId: randomNum,
        hiredDate: Timestamp.now(),
        location: userData.location,
        name: userData.name,
        position: userData.position,
      });

      // Firebase에서 로그인된 유저 정보를 Redux 상태에 저장
      dispatch(
        setUserInfo({
          uid: user.uid,
          email: user.email,
          name: userData.name,
          location: userData.location,
          position: userData.position,
          hiredDate: Timestamp.now(),
          employeeId: randomNum,
        })
      );

      toast.success(`${userData.name} 님 회원이 되신 것을 환영합니다.`);
    } catch (e) {
      if (e instanceof FirebaseError) {
        const errorInfo = authErrors[e.code];
        if (errorInfo) {
          setError((prev) => ({
            ...prev,
            [errorInfo.field]: errorInfo.message,
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
              onChange={onChange}
              name="name"
              value={userData.name}
              placeholder={placeholder.name}
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
                  value={userData.position}
                  name="position"
                  onSelect={(value) => handleSelect("position", value)}
                  label={"직급"}
                  size="autoSmall"
                  options={["메이트", "트레이너"]}
                  defaultOption={userData.position}
                  error={error.position}
                />
                <ErrorWrapper className="selectError">
                  <Error hasError={!!error.position}>{error.position}</Error>
                </ErrorWrapper>
              </InputBox>
              <InputBox>
                <SelectBox
                  id="location"
                  value={userData.location}
                  name="location"
                  onSelect={(value) => handleSelect("location", value)}
                  label={"지점"}
                  size="autoSmall"
                  options={["광복점", "서면점"]}
                  defaultOption={userData.location}
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
              onChange={onChange}
              name="email"
              value={userData.email}
              placeholder={placeholder.email}
              error={error.email}
            />
            <ErrorWrapper>
              <Error hasError={!!error.email}>{error.email || " "}</Error>
            </ErrorWrapper>
            <LoginInput
              id="password"
              label={"비밀번호"}
              onChange={onChange}
              name="password"
              value={userData.password}
              placeholder={placeholder.password}
              type="password"
              error={error.password}
              minLength="6"
            />
            <ErrorWrapper>
              <Error hasError={!!error.password}>
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
