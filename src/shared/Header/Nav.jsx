import { Link } from "react-router-dom";
import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  gap: 20px;

  li {
    a {
      display: inline-block;
      padding: 10px;
      font-size: var(--font-size-title-small);
      font-weight: 700;
      color: var(--text-disabled);
      letter-spacing: -0.36px;
    }
  }
`

const Nav = () => {
  return (
    <nav>
      <NavList>
        <li>
          <Link to="/">내 일정</Link>
        </li>
        <li>
          <Link to="/MySalary">급여 확인</Link>
        </li>
        <li>
          <Link to="/SalaryAdjustment">정정 신청 / 내역</Link>
        </li>
      </NavList>
    </nav>
  );
};

export default Nav;
