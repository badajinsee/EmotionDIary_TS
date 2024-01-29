import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  // 타이틀 바꾸기
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정일기장 - 새 일기`;
  }, []);

  return (
    <div>
      <DiaryEditor isEdit={false} originData={null} />
    </div>
  );
};

export default New;
