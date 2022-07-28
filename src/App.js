import { useState } from "react";
import "./App.css";
import Lucid from "./components/boss/Lucid";
import VerusHilla from "./components/boss/VerusHilla";
import Update from "./components/Update";

// Lucid, Will, Guardian_Angel_Slime, Verus_Hilla, Gloom, Guard_Captain_Darknell, Black_Mage

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [bossTimer, setBossTimer] = useState();

  return (
    <div className={darkMode ? "darkmode" : "app"}>
      <div className="menu">
        <input
          type="button"
          value="루시드"
          onClick={() => setBossTimer(<Lucid />)}
        />
        <input
          type="button"
          value="진힐라"
          onClick={() => setBossTimer(<VerusHilla />)}
        />
        <span className="console">
          {/* <input
        type="button"
        value={darkMode ? "다크모드on" : "다크모드off"}
        onClick={() => {
          setDarkMode(!darkMode);
        }}
      /> */}
          <input
            type="button"
            value="업데이트 내역"
            onClick={() => setBossTimer(<Update />)}
          />
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfRo8H2Cj0MD2g5Him-qlBLbwpPBKDn8Eho0Ks9UflOUJVXTQ/viewform?usp=sf_link"
            target="_blank"
            title="문의하기"
          >
            문의하기
          </a>
        </span>
      </div>
      <div className="timer">{bossTimer}</div>
    </div>
  );
}
export default App;
