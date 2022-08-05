import { useEffect, useState } from "react";
import "./App.css";
import BlackMage from "./components/boss/BlackMage";
import Lucid from "./components/boss/Lucid";
import VerusHilla from "./components/boss/VerusHilla";
import Update from "./components/Update";
import DopingCheckList from "./components/DopingCheckList";
import DropItem from "./components/DropItem";

import work from "./images/work.jpg";

import { getAnalytics, logEvent } from "firebase/analytics";
import { app } from "./firebase.js";

function App() {
  useEffect(() => {
    getAnalytics(app);
    logEvent(getAnalytics(), "screen_view", {
      firebase_screen: "보스타이머",
      firebase_screen_class: "App",
    });
  }, []);
  const [bossTimer, setBossTimer] = useState();
  const [rightBox, setRightBox] = useState();
  const [rightBoxSelector, setRightBoxSelector] = useState();
  const ImgArray = [
    work,
    "https://ssl.nexon.com/s2/game/maplestory/renewal/common/media/artwork/artwork_05.jpg",
    "https://ssl.nexon.com/s2/game/maplestory/renewal/common/media/artwork/artwork_96.jpg",
    "https://lwi.nexon.com/maplestory/common/media/artwork/artwork_114.jpg",
  ];
  const [imgNumber, setImgNumber] = useState(3);

  // 오른쪽 메뉴 선택자
  useEffect(() => {
    if (rightBox === undefined) setRightBoxSelector();
    if (rightBox !== undefined) setRightBoxSelector(rightBox.type.name);
  }, [rightBox]);

  return (
    <div
      style={{
        backgroundImage: `url(${ImgArray[imgNumber]})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        // backgroundSize: imgNumber === 0 ? "" : "90%",
      }}
      className="background"
    >
      <div className="leftbar">
        <input
          type="button"
          value="도핑 체크리스트"
          onClick={() => {
            // setRightBox(
            //   rightBox === undefined ? <DopingCheckList /> : undefined
            // );
            if (rightBoxSelector !== "DopingCheckList") {
              setRightBox(<DopingCheckList />);
              setRightBoxSelector("DopingCheckList");
              logEvent(getAnalytics(), "도핑체크리스트", {
                click: "open",
              });
            } else {
              setRightBox();
              logEvent(getAnalytics(), "도핑체크리스트", {
                click: "close",
              });
            }
          }}
        />
        <input
          type="button"
          value="분배아이템"
          onClick={() => {
            if (rightBoxSelector !== "DropItem") {
              setRightBox(<DropItem />);
              setRightBoxSelector("DropItem");
            } else {
              setRightBox();
            }
          }}
        />
        <div>{rightBox}</div>
      </div>
      <div className="app">
        <div className="menu">
          <input
            type="button"
            value="루시드"
            onClick={() => {
              setBossTimer(<Lucid />);
              setImgNumber(1);
            }}
          />
          <input
            type="button"
            value="진 힐라"
            onClick={() => {
              setBossTimer(<VerusHilla />);
              setImgNumber(2);
            }}
          />
          <input
            style={{ textDecoration: "line-through" }}
            type="button"
            value="검은 마법사"
            onClick={() => {
              setBossTimer(<BlackMage />);
              setImgNumber(0);
            }}
          />
          <span className="console">
            <input
              type="button"
              value="업데이트 내역"
              onClick={() => setBossTimer(<Update />)}
            />
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfRo8H2Cj0MD2g5Him-qlBLbwpPBKDn8Eho0Ks9UflOUJVXTQ/viewform?usp=sf_link"
              target="_blank"
              rel="noreferrer"
              title="문의하기"
            >
              문의하기
            </a>
          </span>
        </div>
        <div className="timer">{bossTimer}</div>
      </div>
      <div className="rightbar"></div>
    </div>
  );
}
export default App;
