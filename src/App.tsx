import { useDispatch, useSelector } from "react-redux";
import { 추가, 삭제, 토글완료, 수정 } from "./main";
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

function App() {
  const todos = useSelector((state: { todos: Todo[] }) => state.todos);
  const dispatch = useDispatch();
  const [input, setInput] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const handleAddTodo = () => {
    if (input.trim()) {
      dispatch(추가(input));
      setInput("");
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveEdit = (todoId: number) => {
    if (editText.trim()) {
      dispatch(수정({ id: todoId, text: editText }));
      setEditingId(null);
      setEditText("");
    }
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={handleAddTodo}>추가</button>
      <p>할 일</p>
      <ul className="list">
        {todos
          .filter((item) => !item.isCompleted)
          .map((todo) => (
            <li key={`key-${todo.id}`} className="listItem">
              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => handleSaveEdit(todo.id)}>저장</button>
                </>
              ) : (
                <>
                  {todo.text}
                  <div>
                    <button onClick={() => dispatch(토글완료(todo.id))}>
                      완료
                    </button>
                    <button onClick={() => dispatch(삭제(todo.id))}>
                      삭제
                    </button>
                    <button onClick={() => handleEdit(todo)}>수정</button>
                  </div>
                </>
              )}
            </li>
          ))}
      </ul>
      {todos.filter((item) => item.isCompleted).length > 0 && (
        <div>
          <p>완료</p>
          <ul className="list">
            {todos
              .filter((item) => item.isCompleted)
              .map((todo) => (
                <li key={`key-${todo.id}`} className="listItem completed">
                  {editingId === todo.id ? (
                    <>
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button onClick={() => handleSaveEdit(todo.id)}>
                        저장
                      </button>
                    </>
                  ) : (
                    <>
                      {todo.text}
                      <div>
                        <button onClick={() => dispatch(토글완료(todo.id))}>
                          취소
                        </button>
                        <button onClick={() => handleEdit(todo)}>수정</button>
                      </div>
                    </>
                  )}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
