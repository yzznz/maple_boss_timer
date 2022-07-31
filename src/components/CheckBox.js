import { getAnalytics, logEvent } from "firebase/analytics";

const CheckBox = ({ value }) => {
  return (
    <div className="checkbox">
      <label style={{ cursor: "pointer" }}>
        <input
          type="checkbox"
          value={value}
          onClick={(e) => {
            e.target.parentElement.style.textDecoration = e.target.checked
              ? "line-through"
              : "";

            if (e.target.checked === true) {
              logEvent(getAnalytics(), "checkbox", {
                item: value,
              });
            }
          }}
        />
        {value}
      </label>
    </div>
  );
};
export default CheckBox;
