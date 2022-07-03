import { useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import Lucid from "./components/boss/Lucid";
import BossButton from "./components/BossButton";

// Lucid, Will, Guardian_Angel_Slime, Verus_Hilla, Gloom, Guard_Captain_Darknell, Black_Mage

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

function App() {
  return (
    <div>
      <Lucid />
    </div>
  );
}

// function App() {
//   const [patternTime, setPatternTime] = useState(0); // 패턴 시간
//   let pattern = 0; //  패턴 주기

//   const reducer = (state, action) => {
//     switch (action.type) {
//       case "lucid": {
//         console.log("Lucid");
//         pattern = 10;
//         setPatternTime(state - pattern);
//         return 320;
//       }
//       case "will": {
//         console.log("Will");
//         return 1800;
//       }
//       case "guardian_angel_slime": {
//         console.log("Guardian_Angel_Slime");
//         return 1800;
//       }
//       case "verus_hilla": {
//         console.log("Verus_Hilla");
//         return 1800;
//       }
//       case "start": {
//         return state - 1;
//       }
//       default:
//         console.log("error");
//         return 0;
//     }
//   };
//   const [state, dispatch] = useReducer(reducer, 0);

//   useEffect(() => {
//     if (state > 0 && state === patternTime) {
//       setPatternTime(state - pattern);
//       console.log("Attack!!");
//     }
//   }, [state]);

//   const sec = useRef(0); //  초기 시간값을 담은 변수

//   const [currentTime, setCurrentTime] = useState(sec.current); //  현재 시간
//   const [remainingTime, setRemainingTime] = useState(0); //  패턴까지 남은 시간
//   const [start, setStart] = useState(false); //  타이머 시작, 정지

//   const interval = useRef(null); //  setInterval()

//   // useEffect(
//   //   () => {
//   //     setRemainingTime(currentTime > pattern ? currentTime - patternTime : 0);
//   //     if (sec.current <= 0) {
//   //       clearInterval(interval.current);
//   //     } else if (sec.current === patternTime) {
//   //       console.log("attack!!");
//   //       setPatternTime(currentTime > pattern ? patternTime - pattern : 0);
//   //     }
//   //   },
//   //   // [sec.current]
//   //   [currentTime, patternTime]
//   // );

//   // useEffect(
//   //   () => {
//   //     setRemainingTime(currentTime > pattern ? currentTime - patternTime : 0);
//   //   },
//   //   // [patternTime]
//   //   [currentTime, patternTime]
//   // );

//   useEffect(() => {
//     if (remainingTime === 90) console.log("1분 30초 남았습니다.");
//     if (remainingTime === 60) console.log("1분 남았습니다.");
//     if (remainingTime === 30) console.log("30초 남았습니다.");
//   }, [remainingTime]);

//   console.log("App", currentTime, patternTime);
//   return (
//     <div className="App">
//       <div className="boss_menu">
//         <BossButton name={"루시드"} value={"lucid"} dispatch={dispatch} />
//         <BossButton name={"윌"} value={"will"} dispatch={dispatch} />
//         <BossButton
//           name={"가엔슬"}
//           value={"guardian_angel_slime"}
//           dispatch={dispatch}
//         />
//         <BossButton name={"진힐라"} value={"verus_hilla"} dispatch={dispatch} />
//         <BossButton
//           name={"검은마법사"}
//           value={"black_mage"}
//           dispatch={dispatch}
//         />
//       </div>
//       <div className="timer_module">
//         <div className="top">
//           <h1>
//             현재 시간 : {Math.floor(state / 60)}분 {state % 60}초
//           </h1>
//           <input
//             type="button"
//             value={!start ? "시작" : "정지"}
//             onClick={() => {
//               // if (!start) {
//               //   setPatternTime(
//               //     sec.current > pattern ? sec.current - pattern : 0
//               //   );
//               //   interval.current = setInterval(() => {
//               //     sec.current -= 1;
//               //     setCurrentTime(sec.current);
//               //   }, 1000);
//               //   setStart(!start);
//               // } else {
//               //   clearInterval(interval.current);
//               //   setStart(!start);
//               // }
//               if (!start) {
//                 interval.current = setInterval(() => {
//                   dispatch({ type: "start" });
//                 }, 1000);
//                 setStart(!start);
//               } else {
//                 clearInterval(interval.current);
//                 setStart(!start);
//               }
//             }}
//           />
//         </div>
//         <div className="middle">
//           <input
//             type="button"
//             value="<"
//             onClick={() => {
//               if (state > 0 && patternTime > 0) setPatternTime(patternTime - 1);
//             }}
//           />

//           <span className="center">
//             <h1>
//               패턴 시작 : {Math.floor(patternTime / 60)}분 {patternTime % 60}초
//             </h1>
//           </span>

//           <input
//             type="button"
//             value=">"
//             onClick={() => {
//               if (state > 0) setPatternTime(patternTime + 1);
//             }}
//           />
//         </div>
//         <div className="bottom">
//           <h1>
//             남은 시간 : {Math.floor(remainingTime / 60)}분 {remainingTime % 60}
//             초
//           </h1>
//         </div>
//         <div className="ultimate">극딜 시작 : </div>
//         <div className="ultimate_remaining">남은 시간 : </div>
//       </div>
//     </div>
//   );
// }

export default App;
