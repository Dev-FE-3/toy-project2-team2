import { createBrowserRouter } from "react-router-dom";
import Calendar from "./pages/calendar/Calendar";
import Login from "./pages/login/Login";
import MySalary from "./pages/mySalary/MySalary";
import SalaryAdjustment from "./pages/salaryAdjustment/SalaryAdjustment";
import Guide from "./pages/guide/Guide";
import { RouterProvider } from "react-router-dom";
import Layout from "./shared/Layout";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import styled from "styled-components";
import LoadingScreen from "./shared/components/LoadingScreen";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import GlobalStyle from "./shared/components/styles/GlobalStyle"

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

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
      <Wrapper>
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      </Wrapper>
    </>
  );
};

export default App;
