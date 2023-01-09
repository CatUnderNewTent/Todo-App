import "../App.css";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  return (
    <>
      <label className="todo">
        <input
          className="to-do-input"
          type="checkbox"
          defaultChecked={todo.complete}
          onChange={handleTodoClick}
        />
        {todo.name}
      </label>
    </>
  );
}
