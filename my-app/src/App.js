import { useState } from "react";
import "./App.css";

function App() {
  const [currentTime, setCurrentTime] = useState(1800);
  const [patternTime, setPatternTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  return (
    <div className="App">
      <div className="timer_module">
        <div className="top">
          <h1>{currentTime}</h1>
        </div>
        <div className="middle">
          <span className="left">
            <input
              type="button"
              value="<"
              onClick={() => {
                setPatternTime(patternTime - 1);
              }}
            />
          </span>
          <span className="center">
            <h1>{patternTime}</h1>
          </span>
          <span className="right">
            <input
              type="button"
              value=">"
              onClick={() => {
                setPatternTime(patternTime + 1);
              }}
            />
          </span>
        </div>
        <div className="bottom">
          <h1>{remainingTime}</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
