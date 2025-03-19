import { useState } from "react";
import { handleError } from "../util/handleError";

const ERROR_INPUT_EMAIL = "올바른 이메일 형식을 입력하세요.";
const ERROR_INPUT_PASSWORD =
  "비밀번호는 특수기호를 포함하여 6자 이상이어야 합니다.";
const ERROR_INPUT_NAME = "이름에는 특수기호와 숫자, 공백을 포함할 수 없습니다.";

const useSignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("직급 선택");
  const [location, setLocation] = useState("지점 선택");
  const [error, setError] = useState({
    password: "",
    name: "",
    email: "",
    position:"",
    location:"",
  });

  const onChangeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      value
    );
    handleError(setError, {
      email: isValid ? "" : ERROR_INPUT_EMAIL,
    });
  };

  const onChangePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
    const isValid =
      (value.length > 6 && /[!@#$%^&*(),.?":{}|<>]/.test(value)) ||
      value === "";
    handleError(setError, {
      password: isValid ? "" : ERROR_INPUT_PASSWORD,
    });
  };

  const onChangeName = (e) => {
    const { value } = e.target;
    setName(value);
    const isValid = /^[a-zA-Z가-힣]+$/.test(value) || value === "";
    handleError(setError, {
      name: isValid ? "" : ERROR_INPUT_NAME,
    });
  };

  return {
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
  };
};

export default useSignupForm;
