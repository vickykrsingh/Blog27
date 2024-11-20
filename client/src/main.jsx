import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MainLayout from "./layout/MainLayout";
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux'
import { store } from "./redux/store.js";
import AuthCheckLayout from "./layout/AuthCheckLayout.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter future={{
    v7_relativeSplatPath:true,
    v7_startTransition:true
  }}>
    <Provider store={store}>
    <AuthCheckLayout>
    <MainLayout>
      <App />
    </MainLayout>
    </AuthCheckLayout>
    </Provider>
  </BrowserRouter>
);
