import React from 'react'
import './cancel.css';

const Cancel = ({trigger,action}) => {
  return (
<div className='cancel' onClick={action}>
    <div className='cross-backword'>🦴</div>
    <div className='cross-forword'>🦴</div>
    </div>)
}

export default Cancel