import {removeTask} from './functions.js';

const box = (tasks,updateTasks,start)=>{
    function update(id){
        console.log(id+" yahi hai");
        const deleted = removeTask(id);
        const updated = tasks.filter(data => data.id != id);
        updateTasks(updated);
    }

return (<div className='nameGrid'>
        <ol>{ tasks.map((data,index)=>
<div className='boxs'>
<span className='task'>{index+1+start +'. '+ data.task}</span>
<div className='box_buttons'>
<button className='boxButton' id = 'editButton' 
// onClick={()=>update(data.id)}
>
   ✒️ EDIT</button>
<button className='boxButton' id = 'deleteButton' 
onClick={()=>update(data.id)}>
   🗑️ Delete</button>
{/* <button className='button' id = 'upButton' padding= '5px'>🔼</button> */}
</div>
</div>)} </ol>
</div>)}

export default box;