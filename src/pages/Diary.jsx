import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

import { getStringDate } from "../util/date.jsx";
import { emotionList } from "../util/emotion.jsx";

import styled from "styled-components";

const Diary = () => {
  // 전달 받은 패스 베리어블들을 모아서 객체로 가져다 줌
  const { id } = useParams();

  // 다이어리리스트 가져오기
  const diaryList = useContext(DiaryStateContext);

  const navigate = useNavigate();

  // 일치하는 데이터 저장 state
  const [data, setData] = useState();

  // id와 diarylist가 변경될때 수행
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        // 일기가 존재할 때
        setData(targetDiary);
      } else {
        // 일기가 없을 때
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    // 감정 일치 확인
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))}의 기록`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <DiarySection>
            <h4>오늘의 감정</h4>
            <DiaryImgWrapper
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} alt="emotionimg" />
              <EmotionDescript className="emotion-descript">
                {curEmotionData.emotion_descript}
              </EmotionDescript>
            </DiaryImgWrapper>
          </DiarySection>
          <DiaryContentSection>
            <h4>오늘의 일기</h4>
            <div className="diary-content-wrapper">
              <p>{data.content}</p>
            </div>
          </DiaryContentSection>
        </article>
      </div>
    );
  }
};

export default Diary;

const DiarySection = styled.section`
  width: 100%;

  margin-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  & h4 {
    font-size: 22px;
    font-weight: bold;
  }
`;

const DiaryImgWrapper = styled.div`
  background-color: #ececec;
  width: 250px;
  height: 250px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  &.diary_img_wrapper_1 {
    background-color: #64c964;
  }
  &.diary_img_wrapper_2 {
    background-color: #9dd772;
  }
  &.diary_img_wrapper_3 {
    background-color: #fdce17;
  }
  &.diary_img_wrapper_4 {
    background-color: #fd8446;
  }
  &.diary_img_wrapper_5 {
    background-color: #fd565f;
  }
`;

const EmotionDescript = styled.div`
  font-size: 25px;
`;

const DiaryContentSection = styled.section`
  width: 100%;

  margin-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  background-color: #ececec;
  border-radius: 5px;
  word-break: keep-all;

  & div {
    width: 100%;
  }

  & p {
    padding: 20px;
    text-align: left;
    font-size: 20px;
    font-family: "Yeon Sung";
    font-weight: 400;
    line-height: 2.5;
  }
`;
