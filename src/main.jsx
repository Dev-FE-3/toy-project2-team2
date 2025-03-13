import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import ToastProvider from "./shared/components/ToastProvider";

// store.js 사용하려면 Provider로 감싸줘야함!!
ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <App />
      <ToastProvider />
    </Provider>
);
