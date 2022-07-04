import { useState, useReducer, useRef, useEffect } from "react";

const reducer = (state, action) => {
  if (typeof action.type === "number") {
    return action.type;
  }
  if (action.type === "start") {
    return state - 1;
  }
};

const VerusHilla = () => {
  const [currentTime, dispatch] = useReducer(reducer, 1800); // 현재시간
  const [patternTime, setPatternTime] = useState(1634); // 패턴시간
  const [remainingTime, setRemainingTime] = useState(currentTime - patternTime); // 남은시간
  const [buttonState, setButtonState] = useState(true); // 토글스위치

  // normal init:196, first:182, second:152, last:121
  // hard init:166, first:152, second:126, last:100

  const interval = useRef(null); // setInterval 경로

  useEffect(() => {
    setRemainingTime(currentTime - patternTime);

    if (currentTime === patternTime) {
      setPatternTime(currentTime - 152);
      console.log("낫 베기");
    }

    if (currentTime === 0) clearInterval(interval.current); // 현재시간이 0이 되면 setInterval 중지
  }, [currentTime]);

  return (
    <div>
      <div className="">
        현재시간 : {Math.floor(currentTime / 60)}분 {currentTime % 60}초{" "}
        <input
          type="button"
          value={buttonState ? "시작" : "리셋"}
          onClick={() => {
            if (buttonState) {
              setButtonState(!buttonState);

              interval.current = setInterval(() => {
                dispatch({ type: "start" });
              }, 100);
            } else if (!buttonState) {
              setButtonState(!buttonState);

              clearInterval(interval.current);

              dispatch({ type: 1800 });
              setPatternTime(1634);
              setRemainingTime(currentTime - patternTime);
            }
          }}
        />
      </div>
      <div className="">
        패턴시간 : {Math.floor(patternTime / 60)}분 {patternTime % 60}초
      </div>
      <div className="">
        남은시간 : {Math.floor(remainingTime / 60)}분 {remainingTime % 60}초
      </div>
    </div>
  );
};
export default VerusHilla;
