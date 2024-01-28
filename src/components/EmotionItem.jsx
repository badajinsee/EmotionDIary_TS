/**
 * 감정 | DiaryEditor(new&edit)
 */
import React from "react";
import styled from "styled-components";

const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSelected,
}) => {
  return (
    <EmotionItemWrapper
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
      ].join(" ")}
      onClick={() => onClick(emotion_id)}
    >
      <img src={emotion_img} alt="emotion_img" />
      <span>{emotion_descript}</span>
    </EmotionItemWrapper>
  );
};

export default React.memo(EmotionItem);

const EmotionItemWrapper = styled.div`
  cursor: pointer;

  border-radius: 5px;
  padding-top: 20px;
  padding-bottom: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & img {
    width: 50%;
    margin-bottom: 10px;
  }
  & span {
    font-size: 18px;
  }

  &.EmotionItem_on_off {
    background: #ececec;
  }
  &.EmotionItem_on_1 {
    background: #64c964;
    color: white;
  }
  &.EmotionItem_on_2 {
    background: #9dd772;
    color: white;
  }
  &.EmotionItem_on_3 {
    background: #fdce17;
    color: white;
  }
  &.EmotionItem_on_4 {
    background: #fd8446;
    color: white;
  }
  &.EmotionItem_on_5 {
    background: #fd565f;
    color: white;
  }
`;
