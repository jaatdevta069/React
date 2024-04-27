import React from 'react'

const taskForm = ({text,setText,isUpdated,addTask1,removeAllTask}) => {
  return (
    <form onSubmit={addTask1}>
          <div className='task-input'><input placeholder='--Enter something--'
          value = {text}
          autoFocus
          type='text'
          name = 'input'
          onChange= {e => setText(e.target.value)}
          />
          
          {isUpdated && <button type="button"
          className="butt" id="click"
          onClick={addTask1} disabled={!text}
        >
          ADD
        </button>} 
         {!isUpdated && <svg class="progress circle-loader" width="40" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<circle cx="20" cy="20" r="15"/>
		</svg> 
        }
        <button type="button"
          className="butt" id="reset"
          onClick={removeAllTask}
        >
          CLEAR
        </button>
        </div>
        </form>
  )
}

export default taskForm;