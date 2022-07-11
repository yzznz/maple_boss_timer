import { useState, useReducer, useRef, useEffect } from "react";

const reducer = (state, action) => {
  if (typeof action.type === "number") {
    return action.type;
  }
  if (action.type === "start") {
    return state - 1;
  }
};

// 패턴시간
const phaseComponent = {
  normal: {
    init: 196,
    phase1: 182,
    phase2: 152,
    phase3: 121,
  },
  hard: {
    init: 166,
    phase1: 152,
    phase2: 126,
    phase3: 100,
  },
};

const VerusHilla = () => {
  const [phaseSelector, setPhaseSelector] = useState({
    difficulty: "hard",
    phase: "phase1",
  });
  const [currentTime, dispatch] = useReducer(reducer, 1800); // 현재시간
  const [patternTime, setPatternTime] = useState(0); // 패턴시간
  const [remainingTime, setRemainingTime] = useState(0); // 남은시간
  const [buttonState, setButtonState] = useState(true); // 토글스위치
  const [excessTime, setExcessTime] = useState(0);

  const [startTime, setStartTime] = useState(1800);
  const prev_startTime = useRef();

  const [phaseTime, setPhaseTime] = useState(0);

  const [test, setTest] = useState(true);

  // 현재 시간에서 패턴시간을 빼지 말고, 낫 베기 시간 기준으로 초기화. 낫 베기 시간 저장한 뒤 참고.

  const interval = useRef(null); // setInterval 경로

  useEffect(() => {
    setRemainingTime(currentTime - patternTime);

    if (currentTime <= patternTime) {
      setPatternTime(startTime - phaseTime);
      setStartTime(currentTime);

      console.log(phaseTime);
      console.log("낫 베기");
    }

    if (currentTime === 0) clearInterval(interval.current); // 현재시간이 0이 되면 setInterval 중지
  }, [currentTime, startTime]);

  useEffect(() => {
    if (remainingTime < 0) {
      prev_startTime.current = startTime;
    }
  }, [remainingTime]); // 남은시간 -될 시 패턴시간 재정의

  useEffect(() => {
    const PhaseSelectorTime =
      phaseComponent[phaseSelector.difficulty][
        startTime === 1800 ? "init" : phaseSelector.phase
      ];

    setPhaseTime(PhaseSelectorTime);

    setPatternTime(startTime - PhaseSelectorTime);
  }, [phaseSelector, startTime]); // 난이도, 페이즈 변경마다 호출

  useEffect(() => {
    setRemainingTime(currentTime - patternTime);
  }, [patternTime]); // phaseSelector 호출 시, 남은시간 재계산

  return (
    <div>
      <div className="">
        현재시간 : {Math.floor(currentTime / 60)}분 {currentTime % 60}초{" "}
        <input
          type="button"
          value={buttonState ? "시작" : "리셋"}
          onClick={() => {
            dispatch({ type: 1800 });
            setStartTime(1800);
            setButtonState(!buttonState);

            if (buttonState) {
              setPhaseSelector({
                difficulty: phaseSelector.difficulty,
                phase: "phase1",
              });

              interval.current = setInterval(() => {
                dispatch({ type: "start" });
              }, 10);
            } else if (!buttonState) {
              clearInterval(interval.current);
            }
          }}
        />
        <input
          type="button"
          value="정지"
          onClick={() => {
            if (!buttonState) {
              setTest(!test);
              if (test) {
                clearInterval(interval.current);
              } else {
                interval.current = setInterval(() => {
                  dispatch({ type: "start" });
                }, 100);
              }
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
      <select
        defaultValue="hard"
        onChange={(e) => {
          setPhaseSelector({
            difficulty: e.target.value,
            phase: phaseSelector.phase,
          });
          console.log(phaseSelector);
        }}
      >
        <option value="normal">normal</option>
        <option value="hard">hard</option>
      </select>
      <div className="phase_btn">
        <button
          className={
            phaseSelector.phase === "phase1"
              ? "phase_btn_selector"
              : "phase_btn_1"
          }
          onClick={() => {
            setPhaseSelector({
              difficulty: phaseSelector.difficulty,
              phase: "phase1",
            });
          }}
        >
          1페이즈
        </button>
        <button
          className={
            phaseSelector.phase === "phase2"
              ? "phase_btn_selector"
              : "phase_btn_2"
          }
          onClick={() => {
            setPhaseSelector({
              difficulty: phaseSelector.difficulty,
              phase: "phase2",
            });
          }}
        >
          2페이즈
        </button>
        <button
          className={
            phaseSelector.phase === "phase3"
              ? "phase_btn_selector"
              : "phase_btn_3"
          }
          onClick={() => {
            setPhaseSelector({
              difficulty: phaseSelector.difficulty,
              phase: "phase3",
            });
          }}
        >
          3페이즈
        </button>
      </div>
      <div className="">
        <h2>낫 주기</h2>
        <h4>2페이즈 : 체력 61% 미만</h4>
        <h4>3페이즈 : 체력 31% 미만</h4>
      </div>
    </div>
  );
};
export default VerusHilla;
