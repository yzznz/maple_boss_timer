import { useState } from "react";
import "./App.css";
import Lucid from "./components/boss/Lucid";
import VerusHilla from "./components/boss/VerusHilla";

// Lucid, Will, Guardian_Angel_Slime, Verus_Hilla, Gloom, Guard_Captain_Darknell, Black_Mage

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [bossTimer, setBossTimer] = useState();

  return (
    <div className={darkMode ? "darkmode" : "app"}>
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
      <input
        type="button"
        value={darkMode ? "다크모드on" : "다크모드off"}
        onClick={() => {
          setDarkMode(!darkMode);
        }}
      />
      {bossTimer}
    </div>
  );
}
export default App;
