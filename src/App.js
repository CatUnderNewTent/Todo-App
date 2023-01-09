import { useState, useRef, useEffect } from "react";
import TodoList from "./Components/TodoList";
import uuid from "react-uuid";
import "./App.css";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos((prevtodos) => [...prevtodos, ...storedTodos]);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuid(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <div className="container">
      <div className="todo-left">
        {todos.filter((todo) => !todo.complete).length} left to do
      </div>
      <input className="todo-input" ref={todoNameRef} type="text" />
      <button className="todo-add-btn" onClick={handleAddTodo}>
        Add Todo
      </button>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <button className="todo-clear-btn" onClick={handleClearTodos}>
        Clear Complete
      </button>
    </div>
  );
}

export default App;
