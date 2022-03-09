<script lang="ts">
  import type { Todo } from "$lib/types";

  export let todo: Todo;
</script>

<div class="todo">
  <form action="/?_method=PATCH" method="post">
    <input type="hidden" name="todo" value={JSON.stringify(todo)} />
    <button
      class="checkbox"
      aria-label="Mark todo as {todo.status ? 'not done' : 'done'}"
    >
      {todo.status ? "✓" : ""}
    </button>
  </form>

  <span class="text">{todo.text}</span>

  <form action="/?_method=DELETE" method="post">
    <input type="hidden" name="id" value={todo.id} />
    <button class="delete" aria-label="Delete todo">✕</button>
  </form>
</div>

<style>
  .todo {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    border-radius: var(--rounded-md);
  }

  .checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: var(--rounded);
    border: 1px solid var(--gray-300);
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 10%);
  }

  .text {
    margin-left: 0.75rem;
    flex-grow: 1;
  }

  .delete {
    opacity: 0.3;
  }
  .delete:hover,
  .delete:focus {
    color: red;
    opacity: 1;
  }
</style>
