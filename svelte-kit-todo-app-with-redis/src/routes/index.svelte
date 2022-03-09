<script lang="ts">
  import "../app.css";
  import type { Todo } from "$lib/types";
  import TodoItem from "../components/Todo.svelte";

  export let todos: Todo[];
  const uncheckedTodos = todos.filter((todo) => !todo.status);
  const checkedTodos = todos.filter((todo) => todo.status);
</script>

<svelte:head>
  <title>Todos</title>
</svelte:head>

<main class="container">
  <form class="new" action="/" method="post">
    <input
      type="text"
      name="text"
      autofocus
      aria-label="Add todo"
      class="input"
      placeholder="What needs to be done?"
    />
  </form>

  <div class="todos">
    {#each uncheckedTodos as todo (todo.id)}
      <TodoItem {todo} />
    {/each}
  </div>

  {#if checkedTodos.length}
    <div class="todos todos-done">
      {#each checkedTodos as todo (todo.id)}
        <TodoItem {todo} />
      {/each}
    </div>
  {/if}


  <p class="repo-link">
    <a
      target="_blank"
      href="https://github.com/upstash/redis-examples/tree/master/svelte-kit-todo-app-with-redis"
    >
      View source on GitHub
    </a>
  </p>
</main>

<style>
  .repo-link {
    margin-top: 2rem;
    text-align: center;
  }

  .todos {
    margin-top: 1.5rem;
  }

  .todos.todos-done {
    background-color: var(--gray-100);
    color: var(--gray-500);
    border-radius: var(--rounded-md);
  }
</style>
