import { useState, useEffect, useRef } from "react";
import App from "./App";
import Login from "./login/login";
import { RouterProvider, createBrowserRouter ,Link} from "react-router-dom";
import { getTasks } from "./functions.js";

const Main = () => {
  const [ tasks, setTasks ] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [startIndex, setStartIndex] = useState(1);
  const [date, setDate] = useState(new Date());
  const count = useRef(0);

  console.log("aaya hai");

  useEffect(() => {
    const data = async function () {
      try {
        const naam = await getTasks(date, startIndex ?? 1);
        count.current = naam.count;
        setTasks(naam.data);
        console.log(naam.data);
      } catch (error) {
        console.log(error);
      } finally {
        setHasData(true);
      }
    };
    data();
    console.log("refreshed");
  }, [date]);

  // return <Login />
  const rout = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
      path: "/",
      element: (
        <App
          tasks={tasks}
          setTasks={setTasks}
          hasData={hasData}
          setHasData={setHasData}
          startIndex={startIndex}
          setStartIndex = {setStartIndex}
          count={count}
          date= {date}
          setDate ={setDate}
        />
      )},
      {path:"*",
      element: <div className = "notFound" >
        <Link to={'/'} style={{textDecorationLine:"none" }}><div style={{color:"wheat"}}>Gunnight</div>
        </Link>
        </div>
    },
  ]);
  return <RouterProvider router={rout} />;
};

export default Main;