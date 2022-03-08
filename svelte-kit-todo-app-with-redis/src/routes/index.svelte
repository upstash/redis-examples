<script lang="ts">
  import type { Todo } from "$lib/types";
  import TodoItem from "../components/TodoItem.svelte";

  export let todos: Todo[];
</script>

<svelte:head>
  <title>Todos</title>
</svelte:head>

<div class="todos">
  <h1>Todos</h1>

  <form class="new" action="/" method="post">
    <input name="text" aria-label="Add todo" placeholder="+ tap to add a todo" />
  </form>

  {#each todos as todo (todo.id)}
    <TodoItem todo={todo} />
  {/each}
</div>

<style>

</style>
