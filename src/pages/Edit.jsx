import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  // 타겟 데이터 넣기
  const [originData, setOriginData] = useState();

  // 페이지 이동(강제이동)
  const navigate = useNavigate();

  //파라미터
  const { id } = useParams();

  // 다이어리 리스트 데이터 가져오기
  const diaryList = useContext(DiaryStateContext);

  // id, diarylist가 변할때만 꺼내오기
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
