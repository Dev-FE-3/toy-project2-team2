import Router from "./router/Router"; // 라우터 설정 불러오기
import Layout from "./shared/Layout"; // 전체 레이아웃 적용
import GlobalStyle from "./shared/components/styles/GlobalStyle"

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Router />
      </Layout>
    </>
  );
};

export default App;