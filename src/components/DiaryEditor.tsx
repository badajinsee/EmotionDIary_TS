/**
 * New, Edit 페이지 공통 컴포넌트
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";
import { DiaryItem } from "../../types";

interface DiaryEditorProps {
  isEdit: boolean;
  originData: DiaryItem | null;
}

const DiaryEditor: React.FC<DiaryEditorProps> = ({ isEdit, originData }) => {
  // dispatch 데이터 불러오기
  const diaryDispatch = useContext(DiaryDispatchContext);
  if (!diaryDispatch) {
    throw new Error("cannot find DiaryDispatchProvider");
  }
  const { onCreate, onEdit, onRemove } = diaryDispatch;

  const navigate = useNavigate();

  // 감정 기본값 저장하기(3번감정:그럭저럭)
  const [emotion, setEmotion] = useState(3);

  // inputbox에 날짜 저장하기
  const [date, setDate] = useState(getStringDate(new Date()));

  // 감정 클릭시 변경
  const handleClickEmote = useCallback((emotion: number) => {
    setEmotion(emotion);
  }, []);

  // 포커싱
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // 일기 입력값 저장하기
  const [content, setContent] = useState("");

  // 작성완료 버튼 기능
  const handleSubmit = () => {
    if (content.length < 1) {
      if (contentRef.current) {
        contentRef.current.focus();
      }
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        if (onCreate) {
          onCreate(date, content, emotion);
        }
      } else {
        if (onEdit && originData) {
          onEdit(originData.id, date, content, emotion);
        }
      }
    }

    navigate("/", { replace: true });
  };

  // 삭제하기

  const handelRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      if (onRemove && originData) {
        onRemove(originData.id);
      }
      navigate("/", { replace: true });
    }
  };

  // 수정하기 부분 데이터 그대로 넘겨주기 | IsEdit과 orgindata값이 바뀔때
  useEffect(() => {
    if (isEdit && originData) {
      setDate(getStringDate(new Date(originData.date)));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <DiaryEditorWrapper>
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton
            type={"default"}
            text={"< 뒤로가기"}
            onClick={() => navigate(-1)}
          />
        }
        rightChild={
          isEdit ? (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handelRemove}
            />
          ) : null
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
            <MyButton
              type={"default"}
              text={"취소하기"}
              onClick={() => navigate(-1)}
            />
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
