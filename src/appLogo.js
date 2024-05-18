import React from 'react'
import logo from './logo.svg'
import './index.css'

const appLogo = () => {
  return (
    <div> 
        {/* <div className="circle"> </div> */}
    <div className="pattern" padding="0px">
      <div className="images" padding="0px">
        <img src={logo} className="App-logo" id="cou" alt="logo" />
        <img src={logo} className="App-logo" id="revu" alt="logo" />
      </div>
      <div className="imagesb" padding="0px">
        <img src={logo} className="App-logo" id="co" alt="logo" />
        <img src={logo} className="App-logo" id="rev" alt="logo" />
      </div>
    </div></div>
  )
}

export default appLogo