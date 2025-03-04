import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Button from '../components/Button'

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

  return <Button onClick={logOut} size="sm" color="gray">로그아웃</Button>;
};

export default LogOut;
