import { Navigate, Outlet } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen";

const ProtectedRouteForManager = () => {
  const [isLoading, setLoading] = useState(true);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().position === "매니저") {
          setIsManager(true);
        }
      }
      setLoading(false);
    };

    checkUserRole();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return isManager ? <Outlet /> : <Navigate to="/Salary" replace />;
};

export default ProtectedRouteForManager;
