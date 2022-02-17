import { Form } from "remix";

export type Todo = { id: string; text: string; status: boolean };

export default function TodoItem({ id, text, status }: Todo) {
  return (
    <div className="todo">
      <Form method="put">
        <input
          type="hidden"
          name="todo"
          defaultValue={JSON.stringify({ id, text, status })}
        />
        <button type="submit" className="checkbox">
          {status && "✓"}
        </button>
      </Form>

      <span className="text">{text}</span>
    </div>
  );
}
