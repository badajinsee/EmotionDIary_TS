import { useParams } from "react-router-dom";

const Diary = () => {
  // 전달 받은 패스 베리어블들을 모아서 객체로 가져다 줌
  const { id } = useParams();
  return (
    <div>
      <h1>Diary</h1>
      <p>이곳은 다이어리 입니다</p>
    </div>
  );
};

export default Diary;
