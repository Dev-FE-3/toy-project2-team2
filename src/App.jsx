import { RouterProvider } from "react-router-dom";
import LoadingScreen from "./shared/components/LoadingScreen";
import GlobalStyle from "./shared/styles/GlobalStyle";
import router from "./shared/components/router/router";
import useAuthUser from "./shared/components/router/hooks/useAuthUser";
import { Provider } from "react-redux";
import ToastProvider from "./shared/components/ToastProvider";
import store from "./store/store";

const App = () => {
  const { userPosition, isLoading } = useAuthUser();
  const appRouter = router(userPosition);

  return (
    <>
      <Provider store={store}>
        <GlobalStyle />
        {isLoading || !router ? (
          <LoadingScreen />
        ) : (
          <RouterProvider router={appRouter} />
        )}
        <ToastProvider />
      </Provider>
    </>
  );
};

export default App;
