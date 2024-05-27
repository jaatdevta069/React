import React from 'react'
import './cancel.css';

const Cancel = ({trigger,action}) => {
  return (
<div className='cancel' onClick={action}>
    <div className='icon cross-backword'>🦴</div>
    <div className='icon cross-forword'>🦴</div>
    </div>)
}

export default Cancel