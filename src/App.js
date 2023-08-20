import logo from './logo.svg';
import { useState ,useEffect} from 'react';
import './App.css';
import Box from './box';

const items = ['banana', 'orange', 'mango', 'lemon','Tomato', 'Potato', 'Cabbage', 'Onion', 'Carrot'];
const length =items.length-1;
function App() {
  const [hasData,setHasData] = useState(false);
  const [names, setNames] = useState([]);
  const [pushed, setPush] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(()=>{
    const data = async function(){
      try{
      const fetchednames = await fetch("http://localhost:245/notes");
      const naam =await fetchednames.json();
      setHasData(true);
      console.log(naam);
      setNames(naam);
    }
    catch(error){
      console.log(error);
    }}
    data()
    console.log("refreshed");
  },[pushed]);
  const push = async ()=>{
    const random = Math.random();
    const item = items[Math.floor(random*length)];
    console.log(item);
    try{
    const names = await fetch("http://localhost:245/notes",{method:"POST",
  body:JSON.stringify({
    title : item,
    description: "react se"
  }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }});
  setPush(random);
  console.log(names.body);}
  catch(error){console.log(error)}
  };
  const remove = async ()=>{
    try{
    const names = await fetch("http://localhost:245/notes",{method:"DELETE",
  body:JSON.stringify({
    description:"react se"
  }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }});
  setNames([]);
  console.log(names.body);}
  catch(error){console.log(error)}
};
const resetCount = ()=> setCount(0);
const increment= (names)=> setCount(names.length);

  return (
    <div className="App">
      <header className="App-header">
        <div className='circle'>
        <img src={logo} className='App-logo' id="coc" alt="logo"/>
        </div>
      <div><div className='images'>
        <img src={logo} className='App-logo' id="cou" alt="logo"/>
        <img src={logo} className='App-logo' id="revu" alt="logo"/></div>
        <div className='imagesb'>
        <img src={logo} className='App-logo' id="co" alt="logo"/>
        <img src={logo} className='App-logo' id="rev" alt="logo"/></div></div>
        <p>
          You have clicked {names.length} times.
        </p>
        { <div className='buttons'> 
        {/* <button type="button" id="click"
          className="butt"
          onClick={increment}
        >
          Click
        </button>
        <button type="button"
          className="butt" id="reset"
          onClick={resetCount}
        >
          Reset
  </button> */ }
        <button type="button"
          className="butt" id="click"
          onClick={push}
        >
          ADD
        </button> <button type="button"
          className="butt" id="reset"
          onClick={remove}
        >
          CLEAR
        </button></div>} 
        {hasData && names.length==0 && <h1>No items Available</h1>}
        {!hasData && <h1>...loading</h1>}
        {hasData && Box(names)}
      </header>
    </div>
  );
}

export default App;
