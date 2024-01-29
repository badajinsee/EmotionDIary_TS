import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import MyButton from "./MyButton";
import DiaryItemComponent from "./DiaryItemComponent";

import { DiaryItem } from "../../types";

interface ControlMenuProps {
  value: string;
  onChange: (value: string) => void;
  optionList: { value: string; name: string }[];
}

interface DiaryListProps {
  diaryList: DiaryItem[];
}

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

const ControlMenu: React.FC<ControlMenuProps> = ({
  value,
  onChange,
  optionList,
}) => {
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

const DiaryList: React.FC<DiaryListProps> = ({ diaryList }) => {
  const navigate = useNavigate();
  // 최신순정렬
  const [sortType, setSortType] = useState("latest");
  // 감정정렬
  const [filter, setFilter] = useState("all");

  const sortedDiaryList = useMemo(() => {
    const getProcessedDiaryList = () => {
      // 감정 필터링 함수
      const filterCallBack = (item: DiaryItem) => {
        if (filter === "good") {
          return item.emotion <= 3;
        } else {
          return item.emotion > 3;
        }
      };
      const compare = (a: DiaryItem, b: DiaryItem) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        if (sortType === "latest") {
          return dateB - dateA;
        } else {
          return dateA - dateB;
        }
      };
      const copyList = JSON.parse(JSON.stringify(diaryList));

      const filteredList =
        filter === "all" ? copyList : copyList.filter(filterCallBack);

      const sortedList = filteredList.sort(compare);
      return sortedList;
    };

    return getProcessedDiaryList();
  }, [diaryList, sortType, filter]);

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

      {sortedDiaryList.map((it: DiaryItem, index: number) => (
        <DiaryItemComponent key={it.id ? it.id : index} {...it} />
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
