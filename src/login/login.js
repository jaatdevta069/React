// import {useMemo} from 'react'
import './login.css'
import Redirect from './redirect';

function login() {
    let arr = new Array(242).fill(0);
    // console.log(arr);
    console.log('rendered '+window.location.pathname);
  return (
    <div className='container'>
        <Redirect path={"/"}/>
        {arr.map((id,index)=> <div key = {index} className='cells'></div>)}
    </div>
  )
}

export default login