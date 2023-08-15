import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const increment= ()=> setCount(count+1);
  const resetCount = ()=> setCount(0);
  return (
    <div className="App">
      <header className="App-header">
      <div><div className='images'>
        <img src={logo} className='App-logo' id="co" alt="logo"/>
        <img src={logo} className='App-logo' id="rev" alt="logo"/></div>
        <div className='imagesb'>
        <img src={logo} className='App-logo' id="co" alt="logo"/>
        <img src={logo} className='App-logo' id="rev" alt="logo"/></div></div>
        <p>
          You have clicked {count} times.
        </p>
        <div className='buttons'>
        <button type="button" id="click"
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
        </button></div> 
      </header>
    </div>
  );
}

export default App;
