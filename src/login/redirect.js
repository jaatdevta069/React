import {Link} from 'react-router-dom'

const Redirect = ({path,pageName}) => {
    path = path ?? "/login"
  return (
    <div style={{position:"fixed", top:"20px", right:"20px", zIndex:1}}>
        <Link to={path}>{pageName}<button className='butt redirect'>🤡</button></Link>
        </div>
  )
}

export default Redirect