import {React} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./task/App.css";
import Main from "./main";
import {ContextProvider} from './context'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ContextProvider child={<Main/>}/>

);