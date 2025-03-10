import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [router, setRouter] = useState(null);

  useEffect(() => {
    // Firebase 로그인 상태 변화 감지
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

    return () => unsubscribe(); // cleanup 함수
  }, []);

  useEffect(() => {
    // userPosition이 변경될 때마다 라우터를 다시 설정
    const updatedRouter = createBrowserRouter([
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

    setRouter(updatedRouter);
  }, [userPosition]); // userPosition 변경 시 라우터 업데이트

  return (
    <>
      <GlobalStyle />
      {isLoading || !router ? (
        <LoadingScreen />
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
};

export default App;
