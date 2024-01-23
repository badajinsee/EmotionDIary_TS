const MyButton = ({ text, type, onClick }) => {
  //btn 타입 적용 , positive, negative가 아닐시 dafault 타입으로 반환
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
