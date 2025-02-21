import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header/Header";

const Wrapper = styled.div``;

const Layout = () => {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  );
};

export default Layout;
