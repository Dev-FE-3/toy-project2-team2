import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./header/Header";

const Wrapper = styled.div`
  width: 1440px;
  margin: 0 auto 100px;
`

const Layout = () => {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  );
};

export default Layout;
