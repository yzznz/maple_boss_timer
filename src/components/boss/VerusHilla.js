import { useState, useReducer, useRef, useEffect } from "react";
import Speech from "../Speech";
import { getAnalytics, logEvent } from "firebase/analytics";

const reducer = (state, action) => {
  if (typeof action.type === "number") {
    return action.type;
  } else if (action.type === "start") {
    return state - 1;
  } else if (action.type === "up") {
    return state + 1;
  } else if (action.type === "down") {
    return state - 1;
  }
};

// 패턴시간
const Timetable = {
  normal: {
    init: 196,
    phase1: 182,
    phase2: 152,
  },
  hard: {
    init: 166,
    phase1: 152,
    phase2: 126,
    phase3: 102,
  },
};

const VerusHilla = () => {
  const [phaseSelector, setPhaseSelector] = useState({
    difficulty: "hard",
    phase: "phase1",
  });
  const [currentTime, dispatch] = useReducer(reducer, 1800); // 현재시간
  const [patternTime, setPatternTime] = useState(0); // 패턴시간
  const [timeRemaining, setTimeRemaining] = useState(0); // 남은시간
  const [startStopBtn, setStartStopBtn] = useState(true); // 시작, 정지 스위치

  const [patternRefTime, setPatternRefTime] = useState(1800); // 패턴 기준 시간
  const [prevRefTime, setPrevRefTime] = useState(1800); // 이전 기준 시간

  const [phaseCycle, setPhaseCycle] = useState(0); // 패턴 주기 저장

  // const [test, setTest] = useState(true); // 정지 재시작 테스트 버튼

  // 현재 시간에서 패턴시간을 빼지 말고, 낫 베기 시간 기준으로 초기화. 낫 베기 시간 저장한 뒤 참고.

  const interval = useRef(null); // setInterval 경로
  const CallVoice = [120, 90, 60, 50, 40, 30, 20, 10, 5, 4, 3, 2, 1];

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = "보스타이머 - 진 힐라";
    logEvent(getAnalytics(), "screen_view", {
      firebase_screen: titleElement.innerHTML,
      firebase_screen_class: "VerusHilla",
    });
  }, []);

  useEffect(() => {
    for (let i = 0; i < CallVoice.length; i++) {
      if (timeRemaining === CallVoice[i]) {
        if (CallVoice[i] % 60 === 0) {
          Speech(`${CallVoice[i] / 60}분 남았습니다.`);
        } else if (CallVoice[i] > 60) {
          Speech(
            `${Math.floor(CallVoice[i] / 60)}분 ${
              CallVoice[i] % 60
            }초 남았습니다.`
          );
        } else if (CallVoice[i] >= 10) {
          Speech(`${CallVoice[i]}초 남았습니다.`);
        } else if (CallVoice[i] > 0) {
          Speech(`${CallVoice[i] === 2 ? "이2" : CallVoice[i]}`);
        }
      }
    }
  }, [timeRemaining]);

  useEffect(() => {
    setTimeRemaining(currentTime - patternTime);

    if (currentTime <= patternTime && patternTime !== 0) {
      let refTime = patternRefTime;
      if (
        patternTime ===
        prevRefTime - Timetable[phaseSelector.difficulty][phaseSelector.phase]
      ) {
        refTime = prevRefTime;
      }
      setPatternTime(refTime - phaseCycle);
      setPrevRefTime(refTime);
      setPatternRefTime(currentTime);
    }

    if (currentTime === 0) clearInterval(interval.current); // 현재시간이 0이 되면 setInterval 중지
  }, [currentTime, patternTime]);

  useEffect(() => {
    const Point =
      Timetable[phaseSelector.difficulty][
        patternRefTime === 1800 ? "init" : phaseSelector.phase
      ];

    setPhaseCycle(Point);

    if (prevRefTime - Point < currentTime) {
      setPatternTime(prevRefTime - Point > 0 ? prevRefTime - Point : 0);
    } else {
      setPatternTime(patternRefTime - Point > 0 ? patternRefTime - Point : 0);
    }
  }, [phaseSelector, patternRefTime]); // 난이도, 페이즈 변경마다 호출

  useEffect(() => {
    if (startStopBtn) {
      logEvent(getAnalytics(), "진 힐라", {
        phase_btn: phaseSelector.difficulty + " " + phaseSelector.phase,
      });
    }
  }, [phaseSelector]);
  return (
    <div>
      <div className="">
        현재시간 : {Math.floor(currentTime / 60)}분 {currentTime % 60}초{" "}
        <input
          type="button"
          value="▼"
          onClick={() => {
            if (patternTime > 0) dispatch({ type: "down" });
            logEvent(getAnalytics(), "진 힐라", {
              setCurrentTime:
                Math.floor(currentTime / 60) +
                "분 " +
                (currentTime % 60) +
                "초" +
                " DOWN",
            });
          }}
        />{" "}
        <input
          type="button"
          value="▲"
          onClick={() => {
            dispatch({ type: "up" });
            logEvent(getAnalytics(), "진 힐라", {
              setCurrentTime:
                Math.floor(currentTime / 60) +
                "분 " +
                (currentTime % 60) +
                "초" +
                " UP",
            });
          }}
        />{" "}
        <input
          type="button"
          value={startStopBtn ? "시작" : "리셋"}
          onClick={() => {
            dispatch({ type: 1800 });
            setPatternRefTime(1800);
            setPrevRefTime(1800);
            setPhaseSelector({
              difficulty: phaseSelector.difficulty,
              phase: "phase1",
            });
            setStartStopBtn(!startStopBtn);
            logEvent(getAnalytics(), "진 힐라", {
              start_btn: startStopBtn,
            });

            if (startStopBtn) {
              Speech("시작 합니다");

              interval.current = setInterval(() => {
                dispatch({ type: "start" });
              }, 1000);
            } else if (!startStopBtn) {
              clearInterval(interval.current);
            }
          }}
        />
        {/* <input
          type="button"
          value="정지"
          onClick={() => {
            if (!startStopBtn) {
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
        /> */}
      </div>
      <div className="">
        패턴시간 : {Math.floor(patternTime / 60)}분 {patternTime % 60}초{" "}
        <input
          type="button"
          value="▼"
          onClick={() => {
            if (patternTime > 0) setPatternTime(patternTime - 1);
            logEvent(getAnalytics(), "진 힐라", {
              setPatternTime:
                phaseSelector.difficulty +
                " " +
                phaseSelector.phase +
                " " +
                Math.floor(patternTime / 60) +
                "분" +
                (patternTime % 60) +
                "초" +
                " DOWN",
            });
          }}
        />{" "}
        <input
          type="button"
          value="▲"
          onClick={() => {
            setPatternTime(patternTime + 1);
            logEvent(getAnalytics(), "진 힐라", {
              setPatternTime:
                phaseSelector.difficulty +
                " " +
                phaseSelector.phase +
                " " +
                Math.floor(patternTime / 60) +
                "분" +
                (patternTime % 60) +
                "초" +
                " UP",
            });
          }}
        />
      </div>
      <div className="">
        남은시간 : {Math.floor(timeRemaining / 60)}분 {timeRemaining % 60}초
      </div>
      <select
        defaultValue="hard"
        onChange={(e) => {
          setPhaseSelector({
            difficulty: e.target.value,
            phase: phaseSelector.phase,
          });
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
        {phaseSelector.difficulty === "normal" ? (
          ""
        ) : (
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
        )}
      </div>
      <div className="">
        <h2>낫 주기</h2>
        <h4>
          {phaseSelector.difficulty === "normal" ? (
            <>2페이즈 : 체력 51% 미만</>
          ) : (
            <>2페이즈 : 체력 61% 미만</>
          )}
        </h4>
        <h4>
          {phaseSelector.difficulty === "normal" ? (
            ""
          ) : (
            <>3페이즈 : 체력 31% 미만</>
          )}
        </h4>
      </div>
    </div>
  );
};
export default VerusHilla;
