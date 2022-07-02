const BossButton = ({ name, value, dispatch }) => {
  return (
    <input
      type="button"
      value={name}
      onClick={() => dispatch({ type: value })}
    />
  );
};

export default BossButton;
