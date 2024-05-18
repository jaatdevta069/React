import React from 'react'
import './checkBox.css'

const Checkbox = ({isCompleted,checkTask,id,task}) => {
  return (
    <div className="checkbox-wrapper-63">
  <label className="switch">
    <input type="checkbox" checked ={isCompleted} onChange={()=>{checkTask(id,task,!isCompleted)}}/>
    <span className="slider"></span>
  </label>
</div>
  )
}

export default Checkbox