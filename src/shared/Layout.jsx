// Layout.jsx
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Outlet /> {/* 여기서 자식 컴포넌트가 렌더링됨 */}
    </>
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
