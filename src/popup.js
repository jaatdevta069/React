import React from 'react';
import Popup from 'reactjs-popup';
import './poppu.css';
import Cancel from './cancel';

const Pop = ({child,trigger}) => (
  <Popup trigger={trigger ?? (<button> Trigger</button>)} 
  position="bottom left">
{close=>(
<>
<Cancel action={close}/>
    <div style={{alignContent: 'end'}}></div>
    {child}</>)}
  </Popup>
);
export default Pop;