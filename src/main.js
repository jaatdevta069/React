import { useContext } from "react";
import App from "./task/App";
import Snake from "./snake/snake.js";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import AuthPage from "./login/AuthPage.js";
import { authContext } from "./context.js";

const Main = () => {
  const { auth } = useContext(authContext);
  console.log(`Token ${auth}`);
  console.log("aaya hai");

  const rout = createBrowserRouter([
    { path: "/auth/*", element: <AuthPage /> },
    { path: "/snake", element: <Snake /> },
    { path: "/task", element: <App /> },
    { path: "*", element: <Navigate to="/auth" /> },
  ]);
  return <RouterProvider router={rout} />;
};

export default Main;
