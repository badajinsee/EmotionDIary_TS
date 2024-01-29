import { ReactElement } from "react";

interface MyHeaderProps {
  headText: string;
  leftChild: ReactElement;
  rightChild: ReactElement | null;
}

const MyHeader: React.FC<MyHeaderProps> = ({
  headText,
  leftChild,
  rightChild,
}) => {
  return (
    <header>
      <div className="head_btn_left">{leftChild}</div>
      <div className="head_text">{headText}</div>
      <div className="head_btn_right">{rightChild}</div>
    </header>
  );
};

export default MyHeader;
