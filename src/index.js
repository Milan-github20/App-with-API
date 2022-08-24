import React from "react";
import ReactDOM from "react-dom/client";
import MyComponent from "./gradovi";
import Main from "./Main";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Main />
    <MyComponent />
  </React.StrictMode>
);
