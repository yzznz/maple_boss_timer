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
          }}
        />
        {value}
      </label>
    </div>
  );
};
export default CheckBox;
