import { removeTask, getTasks } from './functions.js';
import loaderIcon from './loader';

const box = ({ tasks, updateRemoved, start, count }) => {

   // const [updateTask,setUpdateTask] = useState(false);

   async function update(id) {
      console.log(id + " yahi hai");
      const deleted = await removeTask(id);
      const updated = tasks.filter(data => data.id != id);
      if (start + 4 < count) {
         const nextTask = await getTasks(start + 4, 1);
         console.table(nextTask.data);
         updateRemoved([...updated, ...nextTask.data])
      }
      else {
         updateRemoved(updated);
      }
   }

   return (<div className='nameGrid'>
      <ol>{tasks.map((data, index) =>
         <div className='boxs'>
           
            <span className='task'>{index + start + '. ' + data.task}</span>
            <div className='box_buttons'>
               <button className='boxButton' id='editButton'
               // onClick={()=>update(data.id)}
               >
                  ✒️ EDIT</button>
               <button className='boxButton' id='deleteButton'
                  onClick={() => update(data.id)}>
                  🗑️ Delete</button>
            </div>
         </div>)} </ol>
         <loaderIcon/>
   </div>)
}

export default box;