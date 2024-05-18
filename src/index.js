import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, HashRouter } from "react-router-dom";
import AppContextProvider from "./contextApi/ContextProvider";
import { ApiProvider } from "./contextApi/ApiContexts/ApiContexts";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "react-quill/dist/quill.snow.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <ApiProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ApiProvider>
  </HashRouter>
);
