import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // 로그인 여부 확인

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // 로그인 안 했으면 로그인 페이지로 이동
  }

  return children;
};

export default ProtectedRoute;
