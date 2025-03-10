import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { auth, db } from "./shared/firebase";
import { doc, getDoc } from "firebase/firestore";
import Calendar from "./pages/calendar/Calendar";
import Login from "./pages/auth/Login";
import MySalary from "./pages/mySalary/MySalary";
import SalaryAdjustment from "./pages/salaryAdjustment/SalaryAdjustment";
import Guide from "./pages/guide/Guide";
import Layout from "./shared/Layout";
import LoadingScreen from "./shared/components/LoadingScreen";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import GlobalStyle from "./shared/components/styles/GlobalStyle";
import Signup from "./pages/auth/Signup";
import { rolesPermissions } from "./shared/config/rolesPermissions";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    // Firebase 로그인 상태 감지
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserPosition(docSnap.data().position);
        } else {
          setUserPosition(null);
        }
      } else {
        setUserPosition(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // userPosition이 null이면 라우터 생성 지연
  const router = useMemo(() => {
    if (userPosition === null) return null;

    return createBrowserRouter([
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <Calendar />,
          },
          {
            path: "MySalary",
            element: rolesPermissions[userPosition]?.canConfirm ? (
              <Guide />
            ) : (
              <MySalary />
            ),
          },
          {
            path: "SalaryAdjustment",
            element: <SalaryAdjustment />,
          },
          {
            path: "Guide",
            element: <Guide />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ]);
  }, [userPosition]); // userPosition이 업데이트될 때만 다시 생성

  return (
    <>
      <GlobalStyle />
      {isLoading || !router ? <LoadingScreen /> : <RouterProvider router={router} />}
    </>
  );
};

export default App;
