import { Navigate } from "react-router-dom";
import { auth } from "../../../firebase";

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser;
  return user === null ? <Navigate to="/login" /> : children;
};

export default ProtectedRoute;
