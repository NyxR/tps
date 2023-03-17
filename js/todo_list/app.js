import { TodoList } from "./components/TodoList.js";
import { fetchJSON } from "./functions/api.js";
import { createElement } from "./functions/dom.js";

try{
    // const todos = await fetchJSON("https://jsonplaceholder.typicode.com/todos?_limit=10")
    let todos = []
    const todoInStorage = localStorage.getItem('todos')?.toString()
    if (todoInStorage){
        todos = JSON.parse(todoInStorage)
    }
    const todoList = new TodoList(todos)
    todoList.appendTo(document.querySelector('#todo_list'))
} catch (e) {
    const alert_msg = createElement('div', {
        class: "alert alert-danger m-2",
        role: "alert"
    })
    alert_msg.innerText = "Cannot reach the server"
    document.body.prepend(alert_msg)
    console.error(e)
}
