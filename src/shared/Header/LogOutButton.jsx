import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const LogOut = ({ unsubscribe }) => {
  // onSnapshot 구독 해제 함수 받기
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      // 실시간 리스너 해제
      if (unsubscribe) {
        unsubscribe();
      }

      // Firebase 인증 해제
      await auth.signOut();

      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <Button onClick={logOut} size="sm" color="gray">
      로그아웃
    </Button>
  );
};

export default LogOut;
