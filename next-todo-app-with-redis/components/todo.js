export default function Todo({ todo, deleteTodo, updateTodo }) {
  return (
    <div className="todo">
      <button
        className="checkbox"
        onClick={() => updateTodo({ ...todo, status: !todo.status })}
      >
        {todo.status ? "✓" : ""}
      </button>

      <span className="text">{todo.text}</span>

      <input type="hidden" name="id" value={todo.id} />
      <button className="delete" onClick={() => deleteTodo(todo.id)}>
        ✕
      </button>
    </div>
  );
}
