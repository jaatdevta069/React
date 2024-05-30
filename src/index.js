import {React} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import Login from "./login/login";
import "./loader.css";
import Main from "./main";

// const name = document.getElementById("root").title.replace("Gorira");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Main/>
  // </React.StrictMode>
);