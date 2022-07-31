import { useEffect } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";

export default function BlackMage() {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = "보스타이머 - 검은 마법사";
    logEvent(getAnalytics(), "screen_view", {
      firebase_screen: titleElement.innerHTML,
      firebase_screen_class: "BlackMage",
    });
  }, []);
  return <div>공사중</div>;
}
