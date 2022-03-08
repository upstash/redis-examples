<script lang="ts">
  import type { Todo } from "$lib/types";

  export let todo: Todo;
</script>

<div class="todo" class:done={todo.status}>
  <form action="/?_method=PATCH" method="post">
    <input type="hidden" name="action" value="toggle" />
    <input type="hidden" name="todo" value={JSON.stringify(todo)} />
    <button class="toggle" aria-label="Mark todo as {todo.status ? 'not done' : 'done'}">
      {`Mark todo as ${todo.status ? 'not done' : 'done'}`}
    </button>
  </form>

  <form class="text" action="/?_method=PATCH" method="post">
    <input type="hidden" name="action" value="change" />
    <input type="hidden" name="todo" value={JSON.stringify(todo)} />
    <input aria-label="Edit todo" type="text" name="text" value={todo.text} />
    <button class="save" aria-label="Save todo">Save</button>
  </form>

  <form action="/?_method=DELETE" method="post">
    <input type="hidden" name="id" value={todo.id} />
    <button class="delete" aria-label="Delete todo">
      Delete
    </button>
  </form>
</div>

<style>
  .todo {
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
