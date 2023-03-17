import { cloneTmpNode, createElement } from "../functions/dom.js"

export class TodoList{

    // list of todos
    #todos = []

    #listElement = null

    constructor(todos){
        this.#todos = todos

    }

    appendTo (element) {
        element.append(cloneTmpNode("todo_list_tmp"))

        this.#listElement = document.querySelector('#todo_list .list-group')
        for (let todo of this.#todos) {
            const item = new TodoListItem(todo)
            this.#listElement.append(item.element)
        }

        const addButton = document.querySelector('form button')
        addButton.addEventListener('click', e => this.onSubmit(e))

        document.querySelectorAll(".btn-group button").forEach(button => {
            button.addEventListener('click', e => this.toggleFilter(e))
        })

        this.#listElement.addEventListener('delete', ({detail: todo}) => {
            this.#todos = this.#todos.filter(t => t !== todo)
            const previous_msg = document.querySelector('.alert')
            if (previous_msg){
                previous_msg.remove()
            }
            const deletion_msg = createElement('div', {
                class: "alert alert-success m-2",
                role: "alert"
            })
            deletion_msg.innerText = `Successfully remove the task : "${todo.title}"`
            document.body.prepend(deletion_msg)
            this.onUpdate()
        })

        this.#listElement.addEventListener('toggle', ({detail: todo}) => {
            todo.completed = !todo.completed
            this.onUpdate()
        })
    }

    onSubmit(event){
        event.preventDefault()
        const form = event.currentTarget.parentElement
        const title = new FormData(form).get('title').toString().trim()
        const todo = {
            id: Date.now(),
            title,
            completed: false
        }
        const item = new TodoListItem(todo)
        this.#listElement.prepend(item.element)
        this.#todos.push(todo)
        this.onUpdate()
        form.reset()
    }

    onUpdate(){
        localStorage.setItem('todos', JSON.stringify(this.#todos))
    }

    toggleFilter(event){
        event.preventDefault()
        const button = event.currentTarget
        const filter = button.getAttribute('data-filter')
        button.parentElement.querySelector(".active").classList.remove("active")
        button.classList.add("active")
        
        if (filter === 'todo'){
            this.#listElement.classList.add("hide-done")
            this.#listElement.classList.remove("hide-todo")
        } else if (filter === 'done'){
            this.#listElement.classList.add("hide-todo")
            this.#listElement.classList.remove("hide-done")
        } else {
            this.#listElement.classList.remove("hide-todo")
            this.#listElement.classList.remove("hide-done")
        }
    }
}


class TodoListItem {
    #todo = {}

    #element = null

    constructor(todo){
        this.#todo = todo
        const id = `todo_${todo.id}`

        const li = cloneTmpNode("todo_item_layout").firstElementChild
        li.setAttribute("id", id)
        this.#element = li

        const checkbox = li.querySelector('input')
        checkbox.setAttribute("id", id)
        if (todo.completed){
            checkbox.setAttribute("checked", "")
        }

        const label = li.querySelector('label')
        label.setAttribute("for", id)
        label.innerText = todo.title

        const button = li.querySelector('button')
        if (todo.completed) {
            button.classList.add("disabled")
        }

        this.toggle(checkbox)

        button.addEventListener('click', () => this.remove())
        checkbox.addEventListener('change', e => this.toggle(e.currentTarget))

    }

    get element () {
        return this.#element
    }

    remove () {
        const event = new CustomEvent('delete', {
            detail: this.#todo,
            bubbles: true,
            cancelable: true
        })
        this.#element.dispatchEvent(event)
        this.#element.remove()

    }

    toggle(checkbox){
        const event = new CustomEvent('toggle', {
            detail: this.#todo,
            bubbles: true
        })
        if (checkbox.checked){
            this.#element.classList.add("is-completed")
            this.#element.querySelector('button').classList.remove("disabled")
        } else {
            this.#element.classList.remove("is-completed")
            this.#element.querySelector('button').classList.add("disabled")
        }
        this.#element.dispatchEvent(event)
    }


}