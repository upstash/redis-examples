import Todo from "components/todo";
import { useEffect, useState } from "react";

const Index = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const inCompleteTodos = todos.filter((todo) => !todo.status);
  const completedTodos = todos.filter((todo) => todo.status);

  const fetchTodos = async () => {
    const response = await fetch("/api/todo", { method: "GET" });
    const data = await response.json();
    setTodos(data);
  };

  const createTodo = async () => {
    await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return fetchTodos();
  };

  const updateTodo = async (todo) => {
    await fetch(`/api/todo/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todo/${id}`, {
      method: "DELETE",
    });
    return fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className="container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTodo();
        }}
      >
        <input
          type="text"
          name="text"
          autoFocus
          aria-label="Add todo"
          className="input"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>

      <div className="todos">
        {inCompleteTodos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>

      {completedTodos.length > 0 && (
        <div className="todos todos-done">
          {completedTodos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>
      )}

      <p className="repo-link">
        <a
          target="_blank"
          href="https://github.com/upstash/redis-examples/tree/master/next-todo-app-with-redis"
        >
          View source on GitHub
        </a>
      </p>
    </main>
  );
};

export default Index;
