import styled from "styled-components";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
const DiaryItem = ({ id, emotion, content, date }) => {
  // 날짜 사람이 보기 편하게 바꾸기
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const navigate = useNavigate();

  // 일기 상세페이지 이동
  const goDetail = () => {
    navigate(`diary/${id}`);
  };

  return (
    <DiaryItemWrapper>
      <EmotionImg
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </EmotionImg>
      <InfoWrapper onClick={goDetail}>
        <DiaryDate>{strDate}</DiaryDate>
        <DiaryContent>{content.slice(0, 25)}</DiaryContent>
      </InfoWrapper>
      <BtnWrapper className="btn_wrapper">
        <MyButton text={"수정하기"} onClick={() => navigate(`edit/${id}`)} />
      </BtnWrapper>
    </DiaryItemWrapper>
  );
};

export default DiaryItem;

const DiaryItemWrapper = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;

  border-bottom: 1px solid #e2e2e2;

  display: flex;
  justify-content: space-between;
`;

const EmotionImg = styled.div`
  cursor: pointer;
  min-width: 120px;
  height: 80px;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &.emotion_img_wrapper_1 {
    background-color: #64c964;
  }
  &.emotion_img_wrapper_2 {
    background-color: #9dd772;
  }
  &.emotion_img_wrapper_3 {
    background-color: #fdce17;
  }
  &.emotion_img_wrapper_4 {
    background-color: #fd8446;
  }
  &.emotion_img_wrapper_5 {
    background-color: #fd565f;
  }

  & > * {
    width: 50%;
  }
`;

const InfoWrapper = styled.div`
  flex-grow: 1;
  margin-left: 20px;
  cursor: pointer;
`;

const DiaryDate = styled.div`
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 5px;
`;

const DiaryContent = styled.div`
  font-size: 18px;
`;

const BtnWrapper = styled.div`
  min-width: 70px;
`;
