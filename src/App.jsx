import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { auth, db } from "./shared/firebase";
import { doc, getDoc } from "firebase/firestore";
import Calendar from "./pages/calendar/Calendar";
import Login from "./pages/auth/Login";
import Salary from "./pages/salary/Salary";
import SalaryAdjustment from "./pages/salaryAdjustment/SalaryAdjustment";
import Guide from "./pages/guide/Guide";
import Layout from "./shared/Layout";
import LoadingScreen from "./shared/components/LoadingScreen";
import ProtectedRoute from "./shared/components/protectedRoute/ProtectedRoute";
import GlobalStyle from "./shared/styles/GlobalStyle";
import Signup from "./pages/auth/Signup";
import { rolesPermissions } from "./shared/config/rolesPermissions";
import EmployeeList from "./pages/employeeList/EmployeeList";
import ProtectedRouteForManager from "./shared/components/protectedRoute/ProtectedRouteForManager";
import SalaryAdmin from "./pages/salary/SalaryAdmin";

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
            path: "Salary",
            element: rolesPermissions[userPosition]?.canConfirm ? (
              <EmployeeList />
            ) : (
              <Salary />
            ),
          },
          {
            path: "/Salary",
            element: <ProtectedRouteForManager />,
            children: [
              {
                path: ":employeeId",
                element: <SalaryAdmin />,
              },
            ],
          },
          {
            path: "SalaryAdjustment",
            element: <SalaryAdjustment />,
          },
          {
            path: "Guide", // 공통 컴포넌트 활용 확인을 위한 가이드 페이지 입니다.
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
      {isLoading || !router ? (
        <LoadingScreen />
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
};

export default App;
