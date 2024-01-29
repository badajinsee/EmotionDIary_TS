import React, { useEffect, useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

import { DiaryItem } from "../types";

// Action 타입정의
type Action =
  | { type: "INIT"; data: DiaryItem[] }
  | { type: "CREATE"; data: DiaryItem }
  | { type: "REMOVE"; targetId: number }
  | { type: "EDIT"; data: DiaryItem };

// reducer 구현
const reducer = (state: DiaryItem[], action: Action): DiaryItem[] => {
  let newState = [];
  switch (action.type) {
    // "INIT" 액션이 들어왔을 때, action.data 값을 바로 반환하여 상태를 초기화
    case "INIT": {
      return action.data;
    }
    // "CREATE" 액션이 들어왔을 때, action.data를 새로운 아이템으로 생성하고, 기존 상태인 state 배열에 추가한 후 새로운 상태(newState)로 설정
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    // REMOVE" 액션이 들어왔을 때, state 배열에서 it.id가 action.targetId와 다른 아이템만 필터링하여 새로운 상태(newState)로 설정
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    // EDIT > 일기 수정
    // "EDIT" 액션이 들어왔을 때, state 배열을 순회하면서 it.id가 action.data.id와 일치하는 아이템은 새로운 action.data로 대체하고, 그렇지 않은 아이템은 그대로 유지한 후 새로운 상태(newState)로 설정
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  // localstorage
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

// data state 컴포넌트 트리 전역에 공급
export const DiaryStateContext = React.createContext<DiaryItem[] | null>(null);
// dispatch 함수 공급
export const DiaryDispatchContext = React.createContext<{
  onCreate?: (date: string, content: string, emotion: number) => void;
  onRemove?: (targetId: number) => void;
  onEdit?: (
    targetId: number,
    date: string,
    content: string,
    emotion: number
  ) => void;
} | null>(null);

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  // local스토리지에 있는 값을 기초값으로 만들기
  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (diaryB: DiaryItem, diaryA: DiaryItem) => diaryB.id - diaryA.id
      );
      if (diaryList && diaryList.length > 0) {
        dataId.current = diaryList[0].id + 1;
        dispatch({ type: "INIT", data: diaryList });
      }
    }
  }, []);

  const dataId = useRef(6);

  // CREATE
  const onCreate = (date: string, content: string, emotion: number) => {
    const lastId = localStorage.getItem("lastId");
    const newId = lastId ? Number(lastId) + 1 : 1;
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    localStorage.setItem("lastId", String(newId));
    // CREATE 액션을 통해 새로운 데이터가 생성될 때마다 dataId.current 값을 증가 이를 통해 각 데이터는 고유한 id 값을 가지게 됨
  };
  // REMOVE
  const onRemove = (targetId: number) => {
    dispatch({ type: "REMOVE", targetId });
  };
  // EDIT
  const onEdit = (
    targetId: number,
    date: string,
    content: string,
    emotion: number
  ) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
