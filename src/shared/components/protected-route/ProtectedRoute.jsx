import { Navigate } from "react-router-dom";
import { auth } from "../../../firebase";

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ children }) {
  const user = auth.currentUser;
  if (user === null) {
    return <Navigate to="/login" />;
  }
  return children;
}
