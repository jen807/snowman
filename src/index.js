import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { HelmetProvider } from "react-helmet-async";
import { GlobalStyled } from "./GlobalStyled";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <GlobalStyled />
      <Router />
    </HelmetProvider>
  </React.StrictMode>
);
