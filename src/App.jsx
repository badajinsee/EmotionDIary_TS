import React, { useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

// reducer 구현

const reducer = (state, action) => {
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
  return newState;
};

// data state 컴포넌트 트리 전역에 공급
export const DiaryStateContext = React.createContext();
// dispatch 함수 공급
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
    // CREATE 액션을 통해 새로운 데이터가 생성될 때마다 dataId.current 값을 증가 이를 통해 각 데이터는 고유한 id 값을 가지게 됨
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
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
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
