import { useState } from "react";
import "./App.css";
import Lucid from "./components/boss/Lucid";
import VerusHilla from "./components/boss/VerusHilla";

// Lucid, Will, Guardian_Angel_Slime, Verus_Hilla, Gloom, Guard_Captain_Darknell, Black_Mage

function App() {
  const [bossTimer, setBossTimer] = useState();

  return (
    <div className="app">
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
      {bossTimer}
    </div>
  );
}
export default App;
