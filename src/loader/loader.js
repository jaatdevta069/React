import './loader.css'
function Loader({size}) {
  return (
    <div className='loader' style={{'--height':`${size ?? 14}px`}}></div>
  )
}

export default Loader