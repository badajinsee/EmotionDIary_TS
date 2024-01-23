import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  // 최신순정렬
  const [sortType, setSortType] = useState("latest");
  // 감정정렬
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    // 감정 필터링 함수
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    // 원본배열값을 바꾸지않기 위해 copy를 씀
    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filterdList =
      filter === "all" ? copyList : copyList.filter(filterCallBack);

    const sortedList = filterdList.sort(compare);
    return sortedList;
  };

  return (
    <DiaryListWrapper className="DiaryListWrapper">
      <MenuWrapper className="menu_wrapper">
        <LeftCol className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </LeftCol>
        <RightCol className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={() => navigate("/new")}
          />
        </RightCol>
      </MenuWrapper>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </DiaryListWrapper>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;

const DiaryListWrapper = styled.div``;

const MenuWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;

  display: flex;
  justify-content: space-between;
`;

const LeftCol = styled.div`
  & > * {
    margin-right: 10px;
    border: none;
    border-radius: 5px;
    background-color: #ececec;

    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;

    cursor: pointer;
    font-family: "Nanum Pen Script";
    font-size: 18px;
  }
`;

const RightCol = styled.div`
  flex-grow: 1;

  & > * {
    width: 100%;
  }
`;
