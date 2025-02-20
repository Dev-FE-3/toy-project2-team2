import styled from 'styled-components';
import logo from './../../../assets/images/logo.svg';
import Nav from './../nav/Nav';

const HeaderWrap = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 18px 20px;
  background-color: #fff;
`

const Logo = styled.img`
  width: 112px;
`

const Wrap = styled.div`
  display: flex;
`

const User = styled.span`
  display: inline-block;
  margin-left: 60px;
  font-size: 16px;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 38px;
`

const Button = styled.button`
  margin-left: 60px;
  padding: 8px 10px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.32px;
  color: var(--text-disabled);
  border-radius: 8px;
  background-color: var(--background-color);

  &:hover {
    background-color: var(--disabled);
  }
`

const Header = () => {
  return (
    <HeaderWrap>
      <Logo src={logo} alt="Sweet Ten" />
      <Wrap>
        <Nav />
        <User>김이삭 ・ 메이트</User>
        <Button>로그아웃</Button>
      </Wrap>
    </HeaderWrap>
  );
};

export default Header;
