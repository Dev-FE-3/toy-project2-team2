import styled from "styled-components";
import logo from './../../assets/images/logo.svg';
import LogOutButton from "./LogOutButton";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const HeaderWrap = styled.div`
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
`

const HeaderInner = styled.header`
  width: 1440px;
  margin: 0 auto;
  padding: 18px 100px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background-color: var(--white);
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
  font-size: var(--font-size-primary);
  font-weight: 400;
  color: var(--text-primary);
  line-height: 38px;
`

const Header = () => {
  return (
    <HeaderWrap>
      <HeaderInner>
          <Link to="/">
            <Logo src={logo} alt="Sweet Ten" />
          </Link>
          <Wrap>
            <Nav />
            <User>김이삭 ・ 메이트</User>
            <LogOutButton />
          </Wrap>
      </HeaderInner>
    </HeaderWrap>
  );
};

export default Header;
