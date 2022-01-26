const token = 'AYIEACQgZWZhOWYyYTYtZTJmZC00YjMzLWE4YTctYzhhZGY4MTE3NTI4NmQwZGIyOTUzYmJhNDc5ZjkyYjA2MTIxYjY2OTUxNTY='

function createCard(element, className, innerText) {
    const e = document.createElement(element);
    e.href = "#";
    e.className = className;
    e.innerText = innerText;
    return e;
}

async function listTodos() {
    document.querySelectorAll('.card').forEach(e => e.remove())
    document.querySelector('.cardInput').value = ''
    const load = "https://us1-assured-kiwi-33284.upstash.io/lrange/todo/0/100?_token=" + token
    const response = await fetch(load)
    const todos = await response.json()
    const grid = document.querySelector('.grid')
    for (const todo of todos.result) {
        grid.appendChild(createCard('a', 'card', todo))
            .addEventListener('click', (event) => removeTodo(event))
    }
}

async function removeTodo(event) {
    event.preventDefault()
    const todo = event.target.innerText
    const remove = "https://us1-assured-kiwi-33284.upstash.io/lrem/todo/1/" + todo + "?_token=" + token
    const response = await fetch(remove)
    if (response.ok) {
        listTodos()
    }
}

async function addTodo(event) {
    event.preventDefault()
    const todo = event.target.elements.cardInput.value
    const add = "https://us1-assured-kiwi-33284.upstash.io/lpush/todo/" + todo + "?_token=" + token
    const response = await fetch(add, { method: 'POST' })
    if (response.ok) {
        listTodos()
    }
}

window.onload = () => {
    document.querySelector('.cardForm')
        .addEventListener('submit', (event) => addTodo(event))
    listTodos()
}