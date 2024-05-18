import { removeTask, getTasks, updateTask } from "./functions.js";
import { useState } from "react";
import BoxButtons from "./boxButtons.js";
import Checkbox from "./checkbox.js";

const Box = ({ tasks, updateRemoved, start, count, setTasks }) => {
  const [updatingId, setUpdatingId] = useState(null);

  async function update(id) {
    console.log(id + " yahi hai");
    setUpdatingId(id);
    try{
    const deleted = await removeTask(id);
    const updated = tasks.filter((data) => data.id != id);
    if (start + 4 < count) {
      const nextTask = await getTasks(start + 4, 1);
      console.table(nextTask.data);
      updateRemoved([...updated, ...nextTask.data]);
    } else {
      updateRemoved(updated);
    }}
    catch(err){
console.log(err);
    }
    finally{
    setUpdatingId(null);
  }}

  async function checkTask(id,task, isCompleted){
      const updatedTask = await updateTask(id,task,isCompleted);
      const items = tasks.map(item=>
         id === item.id ? {...item,isCompleted: isCompleted}: item)
      setTasks(items);
      console.log(updatedTask);
  }

  return (
    <div className="nameGrid" id="grid">
        {tasks.map((data, index) => (
          <div className="checkDiv" key={data.id}>
          <div className="boxs" key={index}>
            <div className="task" key={data.id} style={data.isCompleted ? {textDecoration:'line-through', color:'#929EA7'}:{}}>{index + start + ". " + data.task}</div>
            <div className="box_buttons" key={index}>
               <BoxButtons 
                text={'DELETE'}
                icon={'🗑️'}
                update={update}
                id={data.id}
                backgroundColor={'rgb(158, 72, 52)'}
                condition={updatingId === data.id}
                />
               <BoxButtons 
                 text={'EDIT'}
                 icon={'✒️'}
                 update={update}
                 backgroundColor={'rgb(58, 142, 52)'}
                 condition={updatingId === data.id}
                 id={data.id}/>
            </div>
          </div>
          <Checkbox 
            id={data.id}
            task={data.task} 
            isCompleted={data.isCompleted}
            checkTask={checkTask}
          /></div>
        ))}
    </div>
  );
};

export default Box;