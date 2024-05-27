import { useState } from "react";
import LoaderIcon from "./loader";
import Popup from "./popup";
import Calender from "./login/calender";
const TaskForm = ({
  text,
  setText,
  isUpdated = true,
  addTask1,
  removeAllTask,
  date,
  setDate,
}) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <div className="flex">
      <form onSubmit={addTask1}>
        <div className="task-input">
          <input
            placeholder="Enter something"
            value={text}
            autoFocus
            type="text"
            name="input"
            onChange={(e) => setText(e.target.value)}
          /> 
          <button
            type="button"
            className="butt"
            id="click"
            onClick={addTask1}
            disabled={!text}
          >
            {isUpdated ? "ADD" : <LoaderIcon radius={3} />}
          </button>
          <button
            type="button"
            className="butt"
            id="reset"
            onClick={removeAllTask}
          >
            {"CLEAR"}
          </button>
        </div>
      </form>
      <Popup
        child={<Calender date={date} setdate={setDate} />}
        trigger={
          <button className="butt calbutt">{`${date.getDate()} ${
            months[date.getMonth()]
          } ${date.getFullYear()} 📆`}</button>
        }
      />
    </div>
  );
};

export default TaskForm;
