import axios from 'axios'

export default axios.create(
    {baseURL:'http://localhost:245/notes'}
)