import { NavLink } from "react-router-dom";
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

      &.active {
        color: var(--text-primary);
      }
    }
  }
`;

const Nav = () => {
  return (
    <nav>
      <NavList>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            내 일정
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Salary"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            급여 확인
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/SalaryAdjustment"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            정정 신청 / 내역
          </NavLink>
        </li>
      </NavList>
    </nav>
  );
};

export default Nav;
