/**
 * New, Edit 페이지 공통 컴포넌트
 */

import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

// 감정데이터 배열
const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "완전좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "끔찍함",
  },
];

// Input창에 오늘의 날짜 기본 값으로 넣기
export const getStringDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  // 월이 10보다 작을 경우, 즉 한 자릿수일 경우 앞에 '0'을 붙여 두 자릿수로 만듬
  if (month < 10) {
    month = `0${month}`;
  }
  // 일자가 10보다 작을 경우, 즉 한 자릿수일 경우 앞에 '0'을 붙여 두 자릿수로 만듬
  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};

const DiaryEditor = () => {
  // dispatch 데이터 불러오기 (Oncreate)
  const { onCreate } = useContext(DiaryDispatchContext);

  const navigate = useNavigate();

  // 감정 기본값 저장하기(3번감정:그럭저럭)
  const [emotion, setEmotion] = useState(3);

  // inputbox에 날짜 저장하기
  const [date, setDate] = useState(getStringDate(new Date()));

  // 감정 클릭시 변경
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };
  // 포커싱
  const contentRef = useRef();

  // 일기 입력값 저장하기
  const [content, setContent] = useState("");

  // 작성완료 버튼 기능
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    onCreate(date, content, emotion);
    navigate("/", { replace: true });
  };

  return (
    <DiaryEditorWrapper>
      <MyHeader
        headText={"새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <TitleQuestion>오늘은 언제인가요?</TitleQuestion>
          <div className="input-box">
            <DateInput
              className="input-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <EmotionListWrapper className="input-box emotion-list-wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </EmotionListWrapper>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="text-wrapper">
            <DiaryTextarea
              placeholder="오늘은 어땠나요"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <ControlBox className="control-box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </ControlBox>
        </section>
      </div>
    </DiaryEditorWrapper>
  );
};

export default DiaryEditor;

const DiaryEditorWrapper = styled.div`
  margin-bottom: 40px;
`;

const TitleQuestion = styled.h4`
  font-size: 22px;
  font-weight: bold;
`;

const DateInput = styled.input`
  border: none;
  border-radius: 5px;
  background-color: #ececec;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  cursor: pointer;
  font-family: "Nanum Pen Script";
  font-size: 20px;
`;

const EmotionListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 2%;
`;

const DiaryTextarea = styled.textarea`
  font-family: "Nanum Pen Script";
  font-size: 20px;

  box-sizing: border-box;
  width: 100%;
  min-height: 200px;
  resize: vertical;

  border: none;
  border-radius: 5px;
  background-color: #ececec;

  padding: 20px;
`;

const ControlBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 50px;
`;
