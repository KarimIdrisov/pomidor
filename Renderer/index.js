'use strict'

const { ipcRenderer } = require('electron')

const deleteTodo = (event) => {
    ipcRenderer.send('delete-todo', event.target.textContent)
}

document.getElementById('createTodoButton').addEventListener('click', () => {
    ipcRenderer.send('add-todo-window')
})

// on receive todos
ipcRenderer.on('todos', (event, todos) => {
    const todoList = document.getElementById('todoList')

    todoList.innerHTML = todos.reduce((html, todo) => {
        html += `<li class="todo-item">${todo}</li>`

        return html
    }, '')

    todoList.querySelectorAll('.todo-item').forEach( item => {
        item.addEventListener('click', deleteTodo)
    })
})