import { useState, memo, useRef,useContext } from "react";
import "./loginPage.css";
import { login, register } from "./loginAPI";
import AlertBanner from "./alertBanner";
import {authContext} from "../context";
import LoginBlock from "./LoginBlock";
import RegisterBlock from "./register";
import { Routes, Route ,useNavigate,Navigate} from "react-router-dom";
// import interceptor from '../axios/iterceptor';
// import Loader from "../loader/loader";

const colors = {
  alert: "#a2161680",
  success: "#0c6b2080",
};

function AuthPage() {
  const { auth, setAuth } = useContext(authContext);
  const navigate = useNavigate();
  const [pathname, setpathname] = useState(window.location.pathname);
  const [alert, setalert] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const message = useRef("");
  const color = useRef("");

  function changeVisibility() {
    setVisibility(!visibility);
  }
  const disabled = useRef(false);

  const goBack = (path)=>{
    navigate(path);
  };

  // console.log(auth);
  // console.log('ye gaya');
  const log = async (event, user, pass) => {
        event.preventDefault();
        console.log(auth);
        const messageApi = await login(user, pass);
        setalert(true);
        console.log(messageApi);
        if (messageApi.status === 200) {
          message.current = messageApi?.data.message;
          color.current = colors.success;
          setTimeout(() => {
            goBack('/task');
            setAuth(messageApi.data.token);
          }, 2000);
        } else {
          color.current = colors.alert;
          switch (messageApi.status) {
            case 404:
              message.current = "User not found!";
              break;

            case 401:
              message.current = "Wrong password, try again.";
              break;
          
            default:
              message.current = 'Error';
              break;
          }
        }
        console.log('khtm')
    };
  
  // console.log('klklkl')

  const signUp = async (event, userName, password, name, mail) => {
    event.preventDefault();
    console.log(`userName ${userName}`)
    const messageApi = await register(userName, password, name, mail);
    setalert(true);
    console.log(messageApi);
    if (messageApi.status === 200) {
      message.current = messageApi?.data.message;
      color.current = colors.success;
      setAuth(messageApi.token);
      disabled.current = true;
      setTimeout(() => {
        setalert(false);
        goBack('/auth');
      }, 2000);
    } 
    else {
      color.current = colors.alert;
    }
  };

  const closeAlert = () => {
    setalert(false);
  };

  return (
    <div className="flex login">
      <div className="loginBox padding">
        <div className="banner">
          {pathname === "/auth" ? "Login" : "Register"}
        </div>
        {alert && (
          <AlertBanner
            color={color.current}
            message={message.current}
            closeAlert={closeAlert}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <LoginBlock
                log={log}
                setpathname={setpathname}
                visibility={visibility}
                changeVisibility={changeVisibility}
              />
            }
          />
          <Route
            path="/register"
            element={
              <RegisterBlock
                setpathname={setpathname}
                log={signUp}
                disabled={disabled.current}
              />
            }
          />
          <Route
          path="*" element={<Navigate to="/auth" />}/>
        </Routes>
      </div>
    </div>
  );
}

export default memo(AuthPage);
