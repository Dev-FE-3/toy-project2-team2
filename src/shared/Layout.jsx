import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./header/Header";
import DispatchUserWrapper from "./Header/DispatchUserWrapper";

const Wrapper = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding: 0 100px;
  box-sizing: border-box;
`;

const Layout = () => {
  return (
    <>
      <DispatchUserWrapper>
        <Header />
      </DispatchUserWrapper>
      <Wrapper>
        <Outlet />
      </Wrapper>
    </>
  );
};

export default Layout;
