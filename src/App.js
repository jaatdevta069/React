import TaskForm from "./form";
import { useState, useRef } from "react";
import "./App.css";
import Box from "./box";
import { pushTask, removeTask, getTasks } from "./functions.js";
import Redirect from "./login/redirect.js";

function App({
  tasks,
  setTasks,
  hasData,
  setHasData,
  startIndex,
  setStartIndex,
  count,
  date,
  setDate
}) {
  const isUpdated = useRef(true);
  const [text, setText] = useState("");

  // console.log("rendered " + window.location.pathname);

  async function prevPage() {
    isUpdated.current = false;
    const updatedIndex = startIndex - 5;
    const newTasks = await getTasks(date, updatedIndex);
    setTasks(newTasks.data);
    setStartIndex(updatedIndex);
    isUpdated.current = true;
  }

  async function nextPage() {
    isUpdated.current = false;
    const updatedIndex = startIndex + 5;
    const newTasks = await getTasks(date, updatedIndex);
    setTasks(newTasks.data);
    setStartIndex(updatedIndex);
    isUpdated.current = true;
  }

  async function addTask1(e) {
    try {
      e.preventDefault();
      isUpdated.current = false;
      const tsk = await pushTask(text);
      isUpdated.current = true;
      if (startIndex === 1) {
        setTasks([tsk, ...tasks.slice(0, 4)]);
      } else {
        setStartIndex(1);
        const newTasks = await getTasks(1);
        setTasks(newTasks.data);
      }
    } catch (khot) {
      console.log(khot);
    } finally {
      count.current = count.current + 1;
      setText("");
    }
  }

  const updateRemoved = (newValue) => {
    setTasks(newValue);
    count.current = count.current - 1;
  };

  const removeAllTask = async (id) => {
    isUpdated.current = false;
    try {
      await removeTask(null);
      setTasks([]);
      count.current = 0;
    } catch (error) {
      console.log(error);
    } finally {
      isUpdated.current = true;
    }
  };

  return (
    <div className="App">
      <Redirect path={"/login"} />
      <header className="App-header">
        <div className="heading">
          <div className="notesHeading">TODO </div>
        </div>
        <TaskForm
          date={date}
          setDate={setDate}
          text={text}
          setText={setText}
          isUpdated={isUpdated}
          addTask1={addTask1}
          removeAllTask={removeAllTask}
        />
        {hasData && (tasks.length ?? 0) === 0 && <h1>No items Available</h1>}
        {!hasData && <h1>...loading</h1>}
        {hasData && (
          <Box
            date={date}
            setTasks={setTasks}
            tasks={tasks}
            updateRemoved={updateRemoved}
            start={startIndex}
            count={count.current}
          />
        )}
        {hasData && (
          <div className="paging">
            {startIndex > 1 && (
              <button
                className="Page1"
                onClick={prevPage}
                disabled={!isUpdated.current}
              >
                ◀
              </button>
            )}
            {count.current > 0 && (
              <p className="number">
                {startIndex}-
                {startIndex + 4 < count.current
                  ? startIndex + 4
                  : count.current}{" "}
                / {count.current} tasks.
              </p>
            )}
            {startIndex + 4 < count.current && (
              <button
                className="Page1"
                onClick={nextPage}
                disabled={!isUpdated.current}
              >
                ▶
              </button>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;