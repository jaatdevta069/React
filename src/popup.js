import React from 'react';
import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import TaskForm from './form';
import './poppu.css';
import Cancel from './cancel';

export default () => (
  <Popup trigger={<button> Trigger</button>} position="center">
    <>
<Cancel/>
    <div style={{alignContent: 'end'}}></div>
    <TaskForm/></>
  </Popup>
);