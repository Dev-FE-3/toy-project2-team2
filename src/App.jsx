import Router from "./router/Router"; // 라우터 설정 불러오기
import Layout from "./shared/Layout"; // 전체 레이아웃 적용

const App = () => {
  return (
    <Layout>
      <Router />
    </Layout>
  );
};

export default App;
