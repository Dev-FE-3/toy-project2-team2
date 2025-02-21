import { auth } from "../../firebase";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LogOutButton = styled.button`
  margin-left: 10px;
`;

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
