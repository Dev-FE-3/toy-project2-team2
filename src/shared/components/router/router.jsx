import { useMemo } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../../Layout";
import Calendar from "../../../pages/calendar/Calendar";
import EmployeeList from "../../../pages/employeeList/EmployeeList";
import SalaryAdmin from "../../../pages/salary/SalaryAdmin";
import SalaryAdjustment from "../../../pages/salaryAdjustment/SalaryAdjustment";
import Salary from "../../../pages/salary/Salary"
import Guide from "../../../pages/guide/Guide";
import Login from "../../../pages/auth/Login";
import Signup from "../../../pages/auth/Signup";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import ProtectedRouteForManager from "./protectedRoute/ProtectedRouteForManager"
import { rolesPermissions } from "../../config/rolesPermissions";

const router = (userPosition) => {
  return useMemo(() => {
    return createBrowserRouter([
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
        children: [
          { path: "", element: <Calendar /> },
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
            children: [{ path: ":employeeId", element: <SalaryAdmin /> }],
          },
          { path: "SalaryAdjustment", element: <SalaryAdjustment /> },
          { path: "Guide", element: <Guide /> },
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ]);
  }, [userPosition]);
};
export default router;
