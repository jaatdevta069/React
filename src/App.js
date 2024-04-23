import logo from './logo.svg';
import { useState ,useEffect} from 'react';
import './App.css';
import Box from './box';
import {pushTask,removeTask} from './functions.js';

function App() { 
  const [hasData,setHasData] = useState(false);
  const [isUpdated,SetisUpdated] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(()=>{
    const data = async function(){
      try{
      const fetchedtasks = await fetch("http://localhost:245/notes"+`?startIndex=${startIndex}`);
      const naam =await fetchedtasks.json();
      setHasData(true);
      setCount(naam.count);
      console.log(naam);
      setTasks(naam.data);
    }
    catch(error){
      console.log(error);
    }}
    data()
    console.log("refreshed");
  },[startIndex]);

function prevPage(){
  setStartIndex(startIndex-5);
}

function nextPage(){
  setStartIndex(startIndex+5);
}

 async function addTask1 (){
  SetisUpdated(false);
  const tsk = await pushTask(text);
  SetisUpdated(true);
  setTasks([tsk,...tasks.slice(0,4)]);
  setCount(count+1);
  setText("");
 }
 const updateRemoved = (newValue)=>{
  setTasks(newValue);
 }

  const removeTask = async (id)=>{
    try{
    const deletedItem = await fetch("http://localhost:245/notes",{method:"DELETE",
  body:JSON.stringify({
    id: null
  }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }});
  // setTasks(tasks.filter(e=>e._id!==id));
  setTasks([]);
}
  catch(error){console.log(error)}
};

  return (
    <div className="App">
      <header className="App-header" >
      <div className='heading'>
      <div className='circle'> </div>
      <div className='pattern' padding = '0px'><div className='images'padding = '0px'>
        <img src={logo} className='App-logo' id="cou" alt="logo"/>
        <img src={logo} className='App-logo' id="revu" alt="logo"/></div>
        {/* <img src={logo} className='App-logo' id="coc" alt="logo"/> */}
        <div className='imagesb' padding = '0px'>
        <img src={logo} className='App-logo' id="co" alt="logo"/>
        <img src={logo} className='App-logo' id="rev" alt="logo"/></div></div>
        <div className='notesHeading'>NOTES</div></div>
        
          <div className='task-input'><input placeholder='--Enter something--'
          value = {text}
          type='text'
          name = 'input'
          onChange= {text => setText(text.target.value)}
          />
          
          {isUpdated && <button type="button"
          className="butt" id="click"
          onClick={addTask1}
        >
          ADD
        </button>} 
         {!isUpdated && <svg class="progress circle-loader" width="40" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<circle cx="20" cy="20" r="15"/>
		</svg> 
        }
        <button type="button"
          className="butt" id="reset"
          onClick={removeTask}
        >
          CLEAR
        </button>
        </div>
        {hasData && tasks.length==0 && <h1>No items Available</h1>}
        {!hasData && <h1>...loading</h1>}
        {hasData && Box(tasks,updateRemoved,startIndex)}
        {hasData && 
        <div className='paging'>
          {startIndex > 0 &&
            <button className='Page1' onClick={prevPage} >◀</button>}
        <p className='number'>
          {startIndex+1}-{startIndex + 5 < count? startIndex+5:count} / {count} tasks.
        </p>
        {startIndex + 5 < count &&
        <button className='Page1' onClick={nextPage}>▶</button>}
        </div>}
      </header>
    </div>
  );
}

export default App;