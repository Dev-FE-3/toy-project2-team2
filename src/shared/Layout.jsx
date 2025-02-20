import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import styled from 'styled-components';

const LayoutContainer = styled.div`
  width: 1440px;
	margin: 0 auto 100px;
`

const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <div className="layout-content">
        <main className="page-content">
          <Outlet /> {/* 라우터에 의해 페이지가 여기에 렌더링됨 */}
        </main>
      </div>
    </LayoutContainer>
  );
};

export default Layout;
