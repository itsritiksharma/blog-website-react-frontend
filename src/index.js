import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";

import { HashRouter as Router } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import Routes from "./routes";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
    {/* <App /> */}
  </Provider>,
  // <React.StrictMode>
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
