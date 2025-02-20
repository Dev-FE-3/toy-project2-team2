// Layout.jsx
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import LogOutButton from "./components/LogOutButton";

const Wrapper = styled.div``;

const Menu = styled.div``;

const MenuItem = styled.div``;

export default function Layout() {
  return (
    <Wrapper>
      <Menu>
        <MenuItem>svg 넣는 칸</MenuItem>
        <Link to="/">내 일정</Link>
        <Link to="/MySalary">급여 확인</Link>
        <Link to="/SalaryAdjustment">정정 신청 / 내역</Link>
        <MenuItem>김이삭 메이트</MenuItem>
        <LogOutButton />
      </Menu>
      <Outlet />
    </Wrapper>
  );
}

// const Layout = () => {
//   return (
//     <>
//       <h2>layout</h2>
//       <Outlet />
//     </>
//   );
// };

// export default Layout;

// import { Outlet } from "react-router-dom";
// import Header from "./components/header/Header";

// const Layout = () => {
//   return (
//     <div className="layout-container">
//       <Header />
//       <div className="layout-content">
//         <main className="page-content">
//           <Outlet /> {/* 라우터에 의해 페이지가 여기에 렌더링됨 */}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;
