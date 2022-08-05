import { useState } from "react";

const ItemMaker = ({ itemname }) => {
  const [qty, setQty] = useState(0);
  return (
    <div className="itemlist">
      <button className="itemname" onClick={() => setQty(qty + 1)}>
        {itemname}
      </button>
      <span className="itemqty">{qty}</span>
      <input
        type="button"
        value="-"
        onClick={() => {
          if (qty !== 0) setQty(qty - 1);
        }}
      />
    </div>
  );
};

export default function DropItem() {
  const ItemArr = [
    "반짝이는 빨간 별 물약",
    "영원한 환생의 불꽃",
    "수상한 에디셔널 큐브",
  ];

  return (
    <div className="dropitem">
      drop
      {ItemArr.map((elm, key) => (
        <ItemMaker key={key} itemname={elm} />
      ))}
    </div>
  );
}
