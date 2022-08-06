import { useState } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";

// https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
function importAll(r) {
  let images = {};
  r.keys().forEach((item) => (images[item.replace("./", "")] = r(item)));
  return images;
}

const images = importAll(
  require.context("../images/icon", false, /\.(png|jpe?g|svg)$/)
);

const ItemMaker = ({ itemname }) => {
  const [qty, setQty] = useState(0);
  return (
    <div className="itemlist">
      <label style={{ cursor: "pointer" }}>
        <img src={images[`${itemname}.png`]} alt={itemname} />
        <button
          className="itemname"
          onClick={() => {
            setQty(qty + 1);
            logEvent(getAnalytics(), "DropItem", {
              click: itemname + " + " + qty,
            });
          }}
        >
          {itemname}
        </button>
      </label>
      <span className="itemqty">{qty}</span>
      <input
        type="button"
        value="-"
        onClick={() => {
          if (qty !== 0) {
            setQty(qty - 1);
            logEvent(getAnalytics(), "DropItem", {
              click: itemname + " - " + qty,
            });
          }
        }}
      />
    </div>
  );
};

export default function DropItem() {
  const ItemArr = [
    "수상한 에디셔널 큐브",
    "소형 경험 축적의 비약",
    "추가 경험치 50% 쿠폰",
    "대형 보스 명예의 훈장",
    "꺼지지 않는 불꽃",
    "영원히 꺼지지 않는 불꽃",
    "영원히 꺼지지 않는 검은 불꽃",
    "강력한 환생의 불꽃",
    "영원한 환생의 불꽃",
    "검은 환생의 불꽃",
    "반짝이는 빨간 별 물약",
    "반짝이는 파란 별 물약",
    "놀라운 긍정의 혼돈 주문서 60%",
    "앱솔랩스 무기 상자",
    "앱솔랩스 방어구 상자",
    "아케인셰이드 무기 상자",
    "아케인셰이드 방어구 상자",
    "매지컬 무기 주문서 교환권",
    "악세서리 스크롤 교환권",
    "프리미엄 악세서리 스크롤 교환권",
    "프리미엄 펫장비 스크롤 교환권",
    "가디언 엔젤 링",
    "트와일라이트 마크",
    "에스텔라 이어링",
    "데이브레이크 펜던트",
    "손상된 블랙 하트",
    "루즈 컨트롤 머신 마크",
    "마력이 깃든 안대",
    "몽환의 벨트",
    "저주받은 마도서 선택 상자",
    "거대한 공포",
    "커맨더 포스 이어링",
    "고통의 근원",
    "창세의 뱃지",
    "미트라의 분노 선택 상자",
  ];

  return (
    <div className="dropitem">
      Drop Item List
      {ItemArr.map((elm, key) => {
        return <ItemMaker key={key} itemname={elm} />;
      })}
    </div>
  );
}
