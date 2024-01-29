import { useContext, useEffect, useState } from "react";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";
import { DiaryItem } from "../../types";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  if (!diaryList) {
    throw new Error("cannot find DiaryStateContext");
  }

  // 날짜에 따라 데이터가 다르게
  const [data, setData] = useState<DiaryItem[]>([]);

  // 날짜 저장
  const [curDate, setCurDate] = useState(new Date());

  // 헤드텍스트
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  // 날짜에 따라 데이터 다르게 추리기 && 달의 첫날과 끝날로
  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);

  // +1 미래 달
  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, 1));
  };

  // -1 과거 달
  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, 1));
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={
          <MyButton type={"default"} text={"<"} onClick={decreaseMonth} />
        }
        rightChild={
          <MyButton type={"default"} text={">"} onClick={increaseMonth} />
        }
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
