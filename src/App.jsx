import { RouterProvider } from "react-router-dom";
import LoadingScreen from "./shared/components/LoadingScreen";
import GlobalStyle from "./shared/styles/GlobalStyle";
import router from "./shared/components/router/router";
import useAuthUser from "./shared/components/router/hooks/useAuthUser";

const App = () => {
  const { userPosition, isLoading } = useAuthUser();
  const appRouter = router(userPosition);

  return (
    <>
      <GlobalStyle />
      {isLoading || !router ? (
        <LoadingScreen />
      ) : (
        <RouterProvider router={appRouter} />
      )}
    </>
  );
};

export default App;
