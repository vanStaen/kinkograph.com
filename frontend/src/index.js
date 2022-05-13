import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import registerServiceWorker from './registerServiceWorker';
import App from "./App";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);