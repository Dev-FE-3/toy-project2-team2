import { auth } from "../../firebase";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LogOutButton = styled.button`
  margin-left: 10px;
`;

export default function LogOut() {
  const navigate = useNavigate();

  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        // 로그아웃 후 로그인 페이지로 리다이렉션
        navigate("/login"); // 로그인 페이지로 이동 (경로는 상황에 맞게 조정)
      })
      .catch((error) => {
        console.error("로그아웃 실패:", error);
      });
  };

  return <LogOutButton onClick={logOut}>Log out</LogOutButton>;
}
