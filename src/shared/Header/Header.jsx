import styled from "styled-components";
import logo from './../../assets/images/logo.svg';
import LogOutButton from "./LogOutButton";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const HeaderWrap = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 18px 20px;
  background-color: #fff;
`

const Logo = styled.img`
  width: 112px;
  height: 100%;
`

const Wrap = styled.div`
  display: flex;
  gap: 60px;
`

const User = styled.span`
  display: inline-block;
  font-size: 16px;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 38px;
`

const Header = () => {
  return (
    <HeaderWrap>
      <Link to="/">
        <Logo src={logo} alt="Sweet Ten" />
      </Link>
      <Wrap>
        <Nav />
        <User>김이삭 ・ 메이트</User>
        <LogOutButton />
      </Wrap>
    </HeaderWrap>
  );
};

export default Header;
