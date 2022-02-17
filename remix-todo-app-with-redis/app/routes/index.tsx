import type { ActionFunction, LoaderFunction } from "remix";
import type { Todo } from "~/components/todo-item";
import { Form, useLoaderData, useTransition, redirect } from "remix";
import TodoItem from "~/components/todo-item";
import { fetchData, insertOrUpdateData } from "~/utils/database";
import { useEffect, useRef } from "react";

export const loader: LoaderFunction = async () => {
  return await fetchData();
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  if (request.method === "POST") {
    const text = form.get("text");
    if (!text) return redirect("/");

    const id = Date.now().toString();
    await insertOrUpdateData(id, { text, status: false });
  }

  if (request.method === "PUT") {
    const todo = form.get("todo");
    const { id, text, status } = JSON.parse(todo as string);
    await insertOrUpdateData(id, {
      text,
      status: !status,
    });
  }

  return redirect("/");
};

export default function Index() {
  const transition = useTransition();
  const todos: Todo[] = useLoaderData();

  const isCreating = transition.submission?.method === "POST";
  const isAdding = transition.state === "submitting" && isCreating;

  const uncheckedTodos = todos.filter((todo) => !todo.status);
  const checkedTodos = todos.filter((todo) => todo.status);

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAdding) return;
    formRef.current?.reset();
    inputRef.current?.focus();
  }, [isAdding]);

  return (
    <main className="container">
      <Form ref={formRef} method="post">
        <input
          ref={inputRef}
          type="text"
          name="text"
          autoComplete="off"
          className="input"
          placeholder="What needs to be done?"
          disabled={isCreating}
        />
      </Form>

      <div className="todos">
        {uncheckedTodos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </div>

      {checkedTodos.length > 0 && (
        <div className="todos todos-done">
          {checkedTodos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </div>
      )}
    </main>
  );
}
