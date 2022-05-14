import React from "react";
import ReactDOM from "react-dom";
import "core-js/stable";
import "regenerator-runtime/runtime";

import App from "./App";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then(() => {
    console.log("Service Worker Registered");
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);