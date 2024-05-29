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
let qu = [];
let speed = 50;
let border = ["5px", "50px", "50px", "5px"]

function Login() {
  const arr = useMemo(() => {
    return new Array(columns * rows).fill(0);
  }, [rows]);
  const trail = useRef(4);
  const que = useRef([]);
  const [pause, setpause] = useState(false);
  const keyPressed = useRef(null);
  const [id1, setid1] = useState(0);
  const interval = useRef(null);
  const food = useMemo(
    () => Math.floor(Math.random() * (columns * rows)),
    [trail.current]
  );
  const collison = useRef(false);
  const [gameOver, setgameOver] = useState(false);
  
  useEffect(() => {
    if (keyPressed.current && !pause) {
      interval.current = setInterval(() => {
        keyPress();
        console.log("run boi");
      }, 500 -(speed * Math.floor(trail.current/4)));
      if (qu.includes(id1) && !collison.current && !pause && !gameOver) {
        setgameOver(true);
        reset();
        console.log("over");
      }
      if (!gameOver && !pause) {
        updatedQueue();
      }
      return () => {
        clearInterval(interval.current);
      };
    }
  }, [id1, pause]);

  const updatedQueue = () => {
    if (qu.length < trail.current) {
      qu.push(id1);
    } else {
      qu.shift();
      qu.push(id1);
    }
  };
  
  function addTrail() {
    trail.current++;
  }

  if (food === id1) {
    addTrail();
  }

  useEffect(() => {
    document.addEventListener("keydown", moveThis);
    console.log("mounted");
    return () => {
      document.removeEventListener("keydown", moveThis);
    };
  }, []);

  function moveThis(event) {
    event.preventDefault();
    collison.current =
      (keyMap[event.key] - keyMap[keyPressed.current]) === 0;
    if (collison.current) {
    } else {
      keyPressed.current = event.key;
      keyPress();
    }
  }

  function reset() {
    keyPressed.current = null;
    trail.current = 4;
    console.log(qu);
    setid1(0);
    console.log(id1);
  }

  function keyPress() {
    // console.log('yaha hu');
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
              qu = []
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
                    qu.includes(index)
                      ? {
                          borderRadius: index === id1 ? "50px" : "5px",
                          backgroundColor: `hsla(160, 100%, ${
                            index === id1 ? 50 : 75
                          }%, ${1}`,
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
              console.log('Gunnight');
            }}}>
          {<box-icon name={!keyPressed.current || pause ? 'play':'pause'} size = '5em' color='gold' ></box-icon>
          }</div>

        </div>
      )}
    </>
  );
}

export default memo(Login);