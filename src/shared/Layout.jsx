import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";

const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      <div className="layout-content">
        <main className="page-content">
          <Outlet /> {/* 라우터에 의해 페이지가 여기에 렌더링됨 */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
