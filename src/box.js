import { useState ,useEffect} from 'react';
import './App.css';

const box = (names)=>
// {return 
    <div className='nameGrid'>{names.map(data=>
<div className='boxs'>
{data.title}</div>)}</div>;

export default box;