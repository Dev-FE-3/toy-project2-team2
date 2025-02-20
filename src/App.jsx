import { createBrowserRouter } from "react-router-dom";
import Calendar from "./pages/calendar/Calendar";
import Login from "./pages/login/Login";
import MySalary from "./pages/mySalary/MySalary";
import SalaryAdjustment from "./pages/salaryAdjustment/SalaryAdjustment";
import { RouterProvider } from "react-router-dom";
import Layout from "./shared/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Calendar />,
      },
      {
        path: "mySalary",
        element: <MySalary />,
      },
      {
        path: "salaryAdjustment",
        element: <SalaryAdjustment />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
