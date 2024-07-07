import React from 'react'
import './checkBox.css'

const Checkbox = ({isCompleted,checkTask,id,task}) => {
  return (
    <div className="checkbox">
  <label className="checkboxL">
    <input type="checkbox" checked ={isCompleted} onChange={()=>{checkTask(id,task,!isCompleted)}}/>
    {/* <span className="slider"></span> */}
  </label>
</div>
  )
}

export default Checkbox