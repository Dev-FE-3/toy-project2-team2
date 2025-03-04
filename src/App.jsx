import { createBrowserRouter } from "react-router-dom";
import Calendar from "./pages/calendar/Calendar";
import Login from "./pages/auth/Login";
import MySalary from "./pages/mySalary/MySalary";
import SalaryAdjustment from "./pages/salaryAdjustment/SalaryAdjustment";
import Guide from "./pages/guide/Guide";
import { RouterProvider } from "react-router-dom";
import Layout from "./shared/Layout";
import { useEffect, useState } from "react";
import { auth } from "./shared/firebase";
import LoadingScreen from "./shared/components/LoadingScreen";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import GlobalStyle from "./shared/components/styles/GlobalStyle";
import Signup from "./pages/auth/Signup";

const router = createBrowserRouter([
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
        element: <MySalary />,
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

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    //wait for firebase login check
    await auth.authStateReady();
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <GlobalStyle />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </>
  );
};

export default App;
