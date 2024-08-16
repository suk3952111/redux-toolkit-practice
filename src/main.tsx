import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import "./index.css";

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

const todoSlice = createSlice({
  name: "todos",
  initialState: [] as Todo[],
  reducers: {
    추가: (state, action) => {
      state.push({
        id: Date.now(),
        text: action.payload,
        isCompleted: false,
      });
    },
    삭제: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    토글완료: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
    수정: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
  },
});

export const { 추가, 삭제, 토글완료, 수정 } = todoSlice.actions;

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
