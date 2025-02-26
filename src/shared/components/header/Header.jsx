import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">캘린더</Link> {/* 경로를 직접 지정 */}
          </li>
          <li>
            <Link to="/MySalary">급여 확인</Link> {/* 경로를 직접 지정 */}
          </li>
          <li>
            <Link to="/SalaryAdjustment">정정 내역/신청</Link>{" "}
            {/* 경로를 직접 지정 */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
