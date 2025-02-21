import { auth } from "../../firebase";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LogOutButton = styled.button`
  padding: 8px 10px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.32px;
  color: var(--text-disabled);
  border-radius: 8px;
  background-color: var(--background-color);

  &:hover {
    background-color: var(--disabled);
  }
`

const LogOut = () => {
  const navigate = useNavigate();

  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("로그아웃 실패:", error);
      });
  };

  return <LogOutButton onClick={logOut}>Log out</LogOutButton>;
};

export default LogOut;
