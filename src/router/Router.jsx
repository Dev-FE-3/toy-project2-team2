import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Calendar from "../pages/calendar/Calendar";
import MySalary from "../pages/mySalary/MySalary";
import SalaryAdjustment from "../pages/salaryAdjustment/SalaryAdjustment";
import NotFoundPage from "../pages/not-found/NotFound";
import { ROUTER_PATH } from "./constant";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTER_PATH.LOGIN} element={<Login />} />
      <Route path={ROUTER_PATH.CALENDAR} element={<Calendar />} />
      <Route path={ROUTER_PATH.MYSALARY} element={<MySalary />} />
      <Route
        path={ROUTER_PATH.SALARYADJUSTMENT}
        element={<SalaryAdjustment />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
