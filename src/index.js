import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
// import "nprogress/nprogress.css";
import "../node_modules/nprogress/nprogress.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
         <BrowserRouter>
            <Layout />
         </BrowserRouter>
      </Provider>
   </PersistGate>,
);
