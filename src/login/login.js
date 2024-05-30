import { memo, useEffect, useMemo, useRef, useState } from "react";
import "./login.css";
import "../index.css";
import 'boxicons';
import Redirect from "./redirect";

let rows = 11;
let columns = 17;
let keyMap = {
  ArrowDown: 2,
  ArrowUp: 2,
  ArrowLeft: 1,
  ArrowRight: 1
};
let directions = [
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown']
let speed = 50;
let border = ["5px", "50px", "50px", "5px"]
const arr = new Array(columns * rows).fill(0);

function Login() {
  const borderRef = useRef(border.slice())
  const trail = useRef(4);
  const [pause, setpause] = useState(false);
  const que = useRef([]);
  const keyPressed = useRef(null);
  const [id1, setid1] = useState(0);
  const interval = useRef(null);
  const food = useMemo(
    () => Math.floor(Math.random() * (columns * rows)),
    [trail.current]
  );
  const collison = useRef(false);
  const [gameOver, setgameOver] = useState(false);
  
  // console.log(que.current)
  useEffect(() => {
    document.addEventListener("keydown", moveThis);
    console.log("mounted");
    return () => {
      document.removeEventListener("keydown", moveThis);
    };
  }, [pause]);

  useEffect(() => {
    // keyPressed.current = (pause && !keyPressed.current) ? 'ArrowRight': keyPressed.current;
    if (keyPressed.current && !pause) {
      interval.current = setInterval(() => {
        keyPress();
      }, 500 -(speed * Math.floor(trail.current/4)));
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [id1, pause]);
  
  const updatedQueue = () => {
    if (que.current.length < trail.current) {
      que.current.push(id1);
    } else {
      que.current.shift();
      que.current.push(id1);
    }
  };

  if (que.current.includes(id1) && !collison.current && !pause && !gameOver) {
    setgameOver(true);
    reset();
    console.log("over");
  }
  if (!gameOver && !pause) {
    updatedQueue();
  }
  const rotateRight = ()=>{
    borderRef.current.push(borderRef.current[0])
    borderRef.current.shift()
    }

  const rotateLeft = ()=>{
    borderRef.current.unshift(borderRef.current.pop());
  }


  function addTrail() {
    trail.current++;
  }

  if (food === id1) {
    addTrail();
  }

  function moveThis(event) {
    event.preventDefault();
      collison.current = (keyMap[event.key] - keyMap[keyPressed.current]) === 0;
        if (collison.current || pause) {
        } else {
          let jj = (directions.indexOf(event.key) + directions.indexOf(keyPressed.current))%2
          if(keyPressed.current || event.key !== 'ArrowRight'){
            if((directions.indexOf(event.key)>1 && jj === 0 )|| (directions.indexOf(event.key)<2 && jj !== 0 )){
              rotateLeft()
            }
            else{
              rotateRight()  
              }}
          keyPressed.current = event.key;
          keyPress();
        }
  }

  function reset() {
    keyPressed.current = null;
    trail.current = 4;
    setid1(0);
  }

  function keyPress() {
    switch (keyPressed.current) {
      case "ArrowDown":
        setid1((prev) => {
          return prev >= columns * (rows - 1)
            ? prev - columns * (rows - 1)
            : prev + columns;
        });
        break;
      case "ArrowUp":
        setid1((prev) => {
          return prev < columns ? prev + columns * (rows - 1) : prev - columns;
        });
        break;
      case "ArrowLeft":
        setid1((prev) => {
          return (prev + 1) % columns === 1 ? prev + (columns - 1) : prev - 1;
        });
        break;
      case "ArrowRight":
        setid1((prev) => {
          return (prev + 1) % columns === 0 ? prev - (columns - 1) : prev + 1;
        });
        break;

      default:
        console.log("kuch or daba");
        break;
    }
  }

  return (
    <>
      {gameOver && (
        <div className="notFound">
          <div
            onClick={() => {
              setgameOver(false)
              que.current = []
              borderRef.current = border.slice()
            }}
            style={{ color: "gold", cursor: "pointer" }}
          >
            Gunnight
          </div>
        </div>
      )}
      {!gameOver && (
        <div className="flex">
          <div className="flex play name">SNAKE</div>
          <div className="container">
            <Redirect path={"/"} />
            {arr.map((id, index) => {
              return (
                <div
                  style={
                    que.current.includes(index)
                      ? {
                          borderRadius: index === id1 ? borderRef.current.join(' ') : "5px",
                          backgroundColor: `hsla(160, 100%, ${
                            50 - (0.7*que.current.indexOf(index))
                          }%,1)`
                        }
                      : {}
                  }
                  key={index}
                  className="cells"
                >
                  {food === index ? "🍅" : ""}
                </div>
              );
            })}
          </div>
          <div
            className="flex play resume"
            onClick={() => {
              if(keyPressed.current){
              setpause(!pause);
              if(pause) keyPress()
              console.log('Gunnight');}
            }}>
          {<box-icon name={!keyPressed.current || pause ? 'play':'pause'} size = '5em' color='gold' ></box-icon>
          }</div>

        </div>
      )}
    </>
  );
}

export default memo(Login);