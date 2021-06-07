'use strict'

const { ipcRenderer } = require('electron')
const addOneTodo = document.getElementById('add_one_todo')
const addMoreTodo = document.getElementById('add_more_todo')

document.getElementById('todoForm').addEventListener('submit', (event) => {
    event.preventDefault()

    const input = event.target[0]

    ipcRenderer.send('add-todo', input.value)

    input.value = ''
})

addOneTodo.addEventListener('click', () => {
    ipcRenderer.send('add-todo-window-close')
})


