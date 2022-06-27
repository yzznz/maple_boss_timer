import { useEffect, useRef, useState } from "react";
import "./App.css";

const initialize = () => {};

function App() {
  const sec = useRef(0);
  const [currentTime, setCurrentTime] = useState(sec.current);
  const [patternTime, setPatternTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [start, setStart] = useState(false);

  const interval = useRef(null);

  const pattern = 120;

  useEffect(() => {
    setRemainingTime(currentTime > pattern ? currentTime - patternTime : 0);
    if (sec.current <= 0) {
      clearInterval(interval.current);
    } else if (sec.current === patternTime) {
      console.log("attack!!");
      setPatternTime(currentTime > pattern ? patternTime - pattern : 0);
    }
  }, [sec.current]);

  useEffect(() => {
    setRemainingTime(currentTime > pattern ? currentTime - patternTime : 0);
  }, [patternTime]);

  useEffect(() => {
    if (remainingTime === 90) console.log("1분 30초 남았습니다.");
    if (remainingTime === 60) console.log("1분 남았습니다.");
    if (remainingTime === 30) console.log("30초 남았습니다.");
  }, [remainingTime]);

  console.log("App", currentTime, patternTime);
  return (
    <div className="App">
      <div className="timer_module">
        <div className="top">
          <h1>
            현재 시간 : {Math.floor(currentTime / 60)}분 {currentTime % 60}초
          </h1>
          <input
            type="button"
            value={!start ? "시작" : "정지"}
            onClick={() => {
              if (!start) {
                sec.current = 3600;
                setPatternTime(
                  sec.current > pattern ? sec.current - pattern : 0
                );
                interval.current = setInterval(() => {
                  sec.current -= 1;
                  setCurrentTime(sec.current);
                }, 1000);
                setStart(!start);
              } else {
                clearInterval(interval.current);
                setStart(!start);
              }
            }}
          />
        </div>
        <div className="middle">
          <input
            type="button"
            value="<"
            onClick={() => {
              if (currentTime > 0 && patternTime > 0)
                setPatternTime(patternTime - 1);
            }}
          />

          <span className="center">
            <h1>
              패턴 시작 : {Math.floor(patternTime / 60)}분 {patternTime % 60}초
            </h1>
          </span>

          <input
            type="button"
            value=">"
            onClick={() => {
              if (currentTime > 0) setPatternTime(patternTime + 1);
            }}
          />
        </div>
        <div className="bottom">
          <h1>
            남은 시간 : {Math.floor(remainingTime / 60)}분 {remainingTime % 60}
            초
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
