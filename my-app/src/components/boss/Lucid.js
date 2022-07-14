import { useEffect, useReducer, useRef, useState } from "react";
import Speech from "../Speech";
// useEffect로 state 관찰 후 패턴, 남은시간 변경
// 패턴, 남은시간 상태관리 해야할지.

const reducer = (state, action) => {
  if (typeof action.type === "number") {
    return action.type;
  }
  if (action.type === "start") {
    return state - 1;
  }
};

const Lucid = () => {
  // 발판 시간 입력하면 2분 주기 계산기
  // 폭탄 버튼 누르면 90초 쿨타임

  // 시간 입력 받아야함
  const [inputTime, setInputTime] = useState(""); // 입력받는 시간, 4자리
  const [currentTime, dispatch] = useReducer(reducer, 0); // 현재시간
  const [patternTime, setPatternTime] = useState(0); // 패턴시간
  const [remainingTime, setRemainingTime] = useState(0); // 남은시간
  const [buttonState, setButtonState] = useState(true); // 토글스위치

  const [patternDate, setPatternDate] = useState(120); // 발판 주기
  const [boomDate, setBoomDate] = useState(90); // 폭탄 주기

  const [boomTime, setBoomTime] = useState(0); // 폭탄시간
  const [boomRemaining, setBoomRemaining] = useState(0); // 폭탄남은시간

  const interval = useRef(null); // setInterval 경로

  const CallVoice = [90, 60, 30, 20, 10, 5, 4, 3, 2, 1];

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = "보스타이머 - 루시드";
  }, []);

  useEffect(() => {
    if (currentTime >= patternTime) setRemainingTime(currentTime - patternTime); // 남은시간 계산

    if (boomTime > 0 && boomRemaining > 0)
      setBoomRemaining(currentTime - boomTime); // 폭탄남은시간 계산

    if (currentTime > boomDate && currentTime === boomTime) {
      console.log("Boom!!");
      Speech("현 시간부로 폭탄에 대비하세요.");
    }

    if (currentTime > patternDate && currentTime === patternTime) {
      setPatternTime(currentTime - patternDate);
      console.log("Attack!!");
    }

    if (currentTime === 0) clearInterval(interval.current); // 현재시간이 0이 되면 setInterval 중지
  }, [currentTime, patternTime]);

  useEffect(() => {
    for (let i = 0; i < CallVoice.length; i++) {
      if (remainingTime === CallVoice[i]) {
        if (CallVoice[i] > 60) {
          Speech(
            `${Math.floor(CallVoice[i] / 60)}분 ${
              CallVoice[i] % 60
            }초 남았습니다.`
          );
        } else if (CallVoice[i] === 60) {
          Speech("1분 남았습니다.");
        } else if (CallVoice[i] >= 10) {
          Speech(`${CallVoice[i]}초 남았습니다.`);
        } else if (CallVoice[i] > 0) {
          Speech(`${CallVoice[i] === 2 ? "이2" : CallVoice[i]}`);
        }
      }
    }
  }, [remainingTime]);

  return (
    <div className="lucid">
      <div>가운데 발판 깨진 시간 입력</div>
      <div className="">
        <input
          className="input_box"
          type="text"
          placeholder="예)17분35초 = 1735"
          minLength="4"
          maxLength="4"
          value={inputTime}
          onChange={(e) => {
            setInputTime(e.target.value);
          }}
        />
        <input
          type="button"
          value={buttonState ? "시작" : "리셋"}
          onClick={() => {
            if (buttonState && inputTime.length === 4) {
              setButtonState(!buttonState);

              Speech("시작 합니다");

              const minute = parseInt(inputTime[0] + inputTime[1]);
              const second = parseInt(inputTime[2] + inputTime[3]);

              const exchange_time = minute * 60 + second;

              dispatch({ type: exchange_time });
              setPatternTime(exchange_time - patternDate);

              interval.current = setInterval(() => {
                dispatch({ type: "start" });
              }, 1000);
            } else if (!buttonState) {
              setButtonState(!buttonState);

              clearInterval(interval.current);

              setInputTime("");
              dispatch({ type: 0 });
              setPatternTime(0);
              setBoomTime(0);
              setBoomRemaining(0);
            }
          }}
        />
      </div>
      <div className="">
        현재시간 : {Math.floor(currentTime / 60)}분 {currentTime % 60}초
      </div>
      <div className="">
        발판시간 : {Math.floor(patternTime / 60)}분 {patternTime % 60}초{" "}
        <input
          type="button"
          value="▼"
          onClick={() => {
            if (patternTime > 0) setPatternTime(patternTime - 1);
          }}
        />{" "}
        <input
          type="button"
          value="▲"
          onClick={() => {
            setPatternTime(patternTime + 1);
          }}
        />
      </div>
      <div className="">
        남은시간 : {Math.floor(remainingTime / 60)}분 {remainingTime % 60}초
      </div>
      <br />
      <div className="">
        폭탄 쿨타임{" "}
        <input
          type="button"
          value="시작"
          onClick={() => {
            if (!buttonState && currentTime >= boomDate) {
              setBoomTime(currentTime - boomDate);
              setBoomRemaining(boomDate);
            }
          }}
        />
      </div>
      <div className="">
        폭탄시간 : {Math.floor(boomTime / 60)}분 {boomTime % 60}초 이후
      </div>
      <div className="">
        남은시간 : {Math.floor(boomRemaining / 60)}분 {boomRemaining % 60}초
      </div>
      <br />
      <div>
        발판 주기 : {patternDate}초 <br />
        폭탄 쿨타임 : {boomDate}초
      </div>
    </div>
  );
};

export default Lucid;
