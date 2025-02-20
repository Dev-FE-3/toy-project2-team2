import { Link } from "react-router-dom";
import { ROUTER_PATH } from "../../../router/constant";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to={ROUTER_PATH.CALENDAR}>캘린더</Link>
          </li>
          <li>
            <Link to={ROUTER_PATH.MYSALARY}>급여 확인</Link>
          </li>
          <li>
            <Link to={ROUTER_PATH.SALARYADJUSTMENT}>정정 내역/신청</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
