import styled from "styled-components";
import LogOutButton from "./LogOutButton";
import Nav from "./Nav";

const Menu = styled.div``;
const MenuItem = styled.div``;

const Header = () => {
  return (
    <Menu>
      <MenuItem>svg 넣는 칸</MenuItem>
      <Nav />
      <MenuItem>김이삭 메이트</MenuItem>
      <LogOutButton />
    </Menu>
  );
};

export default Header;
