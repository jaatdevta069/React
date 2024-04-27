import logo from './logo.svg';
import { useState ,useEffect} from 'react';
import './App.css';
import Box from './box';
import loaderIcon from './loader';
import taskForm from './form';
import {pushTask,removeTask,update,getTasks} from './functions.js';

function App() { 
  const [hasData,setHasData] = useState(false);
  const [isUpdated,SetisUpdated] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [startIndex, setStartIndex] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(()=>{
    const data = async function(){
      try{
      // const fetchedtasks = await fetch("http://localhost:245/notes"+`?startIndex=${startIndex}`);
      const naam = await getTasks(startIndex);
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
  },[]);

async function prevPage(){
  SetisUpdated(false);
  const updatedIndex = startIndex-5;
  const newTasks = await getTasks(updatedIndex);
  setTasks(newTasks.data);
  setStartIndex(updatedIndex);
  SetisUpdated(true);
}

async function nextPage(){
  SetisUpdated(false);
  const updatedIndex = startIndex+5;
  const newTasks = await getTasks(updatedIndex);
  setTasks(newTasks.data);
  setStartIndex(updatedIndex);
  SetisUpdated(true);
}

 async function addTask1 (e){
  e.preventDefault();
  SetisUpdated(false);
  const tsk = await pushTask(text);
  SetisUpdated(true);
  setTasks([tsk,...tasks.slice(0,4)]);
  setCount(count+1);
  setText("");
 }
 const updateRemoved = (newValue)=>{
  setTasks(newValue);
  setCount(count-1);
 }

  const removeAllTask = async (id)=>{
    try{
    const deletedItem = removeTask(null);
    setTasks([]);
    setCount(0);
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
        <loaderIcon />
        <div className='notesHeading'>NOTES</div></div>
        <taskForm 
          text
          setText
          isUpdatedaddTask1
          removeAllTask
        />
        {hasData && tasks.length==0 && <h1>No items Available</h1>}
        {!hasData && <h1>...loading</h1>}
        {hasData && <Box tasks ={tasks} 
        updateRemoved= {updateRemoved}
        start= {startIndex}
        count={count}/>}
        {hasData && 
        <div className='paging'>
          {startIndex > 1 &&
            <button className='Page1' onClick={prevPage} disabled={!isUpdated}>◀</button>}
        { count>0 && <p className='number'>
            {startIndex}-{startIndex + 4 < count? startIndex+4:count} / {count} tasks.
        </p>}
        {startIndex + 4 < count &&
        <button className='Page1' onClick={nextPage} disabled={!isUpdated}>▶</button>}
        </div>}
      </header>
    </div>
  );
}

export default App;