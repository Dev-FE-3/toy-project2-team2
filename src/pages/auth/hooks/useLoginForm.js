import { useState } from "react";
import { handleError } from "../util/handleError";

const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    common: "",
    email: "",
  });

  const onChangeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      value
    );
    handleError(setError, {
      email: isValid ? "" : "올바른 이메일 형식을 입력하세요.",
      common: "",
    });
  };

  const onChangePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
    handleError(setError, { common: "" });
  };

  return { email, password, error, onChangeEmail, onChangePassword, setError };
};

export default useLoginForm;
