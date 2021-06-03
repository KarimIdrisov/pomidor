'use strict'

const path = require('path')
const {app, ipcMain} = require('electron')

// out constructors
const Window = require('./Classes/Window')
const DataStore = require('./Classes/DataStore')

// create a new to-do store
const todosData = new DataStore({ name: 'Todos Main'})

function main() {
    // to-do list window
    let mainWindow = new Window({
        file: path.join('Renderer', 'index.html')
    })

    // init add to-do window
    let addTodoWindow

    // TODO: put these events in their own life

    // init with todos
    mainWindow.once('show', () => {
        mainWindow.webContents.send('todos', todosData.todos)
    })

    // create add to-do window
    ipcMain.on('add-todo-window', () => {
        console.log(1)
        if (!addTodoWindow) {
            addTodoWindow = new Window({
                file: path.join('Renderer', 'addTodo.html'),
                width: 400,
                height: 400,
                // close with the main window
                parent: mainWindow
            })

            // cleanup
            addTodoWindow.on('closed', () => {
                addTodoWindow = null
            })
        }
    })

    // add to-do from add to-do window
    ipcMain.on('add-todo', (event, todo) => {
        const updatedTodos = todosData.addTodo(todo).todos

        mainWindow.send('todos', updatedTodos)
    })

    // delete to-do
    ipcMain.on('delete-todo', (event, todo) => {
        const updatedTodos = todosData.deleteTodo(todo).todos

        mainWindow.send('todos', updatedTodos)
    })
}

app.on('ready', main)

app.on('window-all-closed', function () {
    app.quit()
})