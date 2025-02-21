import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.nav``;

const Nav = () => {
  return (
    <NavContainer>
      <Link to="/">내 일정</Link>
      <Link to="/MySalary">급여 확인</Link>
      <Link to="/SalaryAdjustment">정정 신청 / 내역</Link>
    </NavContainer>
  );
};

export default Nav;
