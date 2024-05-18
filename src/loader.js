import React from 'react'
import './loader.css';

const LoaderIcon = ({radius}) => {
  const radi =radius ?? 25;
  return (
    <div className = 'loaderIcon' style={{height:radi, width:radi}}></div>
  )
}

export default LoaderIcon;