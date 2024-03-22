// import "bootstrap/dist/css/bootstrap.min.css"; // Does not work with this
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import store from "./redux/store/Store";
import { Provider } from "react-redux";
import Loader from "./components/loader/Loader";
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// {/* <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>; */}
// import LoginPage from "./components/loginpage/LoginPage";
// import RegistrationPage from "./components/registrationpage/RegistrationPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
    {/* <Loader /> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
