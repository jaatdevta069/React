import React from "react";
import LoaderIcon from "./loader";

const TaskForm = ({ text, setText, isUpdated = true, addTask1, removeAllTask }) => {
  return (
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
          {/* {isUpdated ?  */}
          {"CLEAR"} 
           {/* : <LoaderIcon radius={3} /> */}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
