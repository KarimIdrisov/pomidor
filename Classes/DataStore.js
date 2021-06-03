'use strict'

const Store = require('electron-store')

class DataStore extends Store {
    constructor(settings) {
        super(settings);

        // initialize with todos
        this.todos = this.get('todos') || []
    }

    saveTodos() {
        // save todos to JSON file
        this.set('todos', this.todos)

        // returning 'this' allow method chaining
        return this
    }

    getTodos() {
        // set object`s todos to todos in JSON file
        this.todos = this.get('todos') || []

        return this
    }

    addTodo(todo) {
        // merge existing todos with the new to-do
        this.todos = [...this.todos, todo]

        return this.saveTodos()
    }

    deleteTodo(todo) {
        // filter out target to-do
        this.todos = this.todos.filter( t => t !== todo)

        return this.saveTodos()
    }
}

module.exports = DataStore