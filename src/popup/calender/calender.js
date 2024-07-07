import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const Calender = ({setdate,date}) => {
  return (
    <Calendar value={date} className= {'calender'} onClickDay={(value) => setdate(value)}/>)
}

export default Calender