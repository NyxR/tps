import http from "../common/http_common"
import { todosUrl, createTodoUrl } from "../urls/todos_urls"

// fetch todos function request
export const getTodos = (callback, errorCallback) => {
    let result = null;
    http.get(todosUrl)
    .then((response) => {
        if (response){
            result = response.data;
            callback(result);
        }
    })
    .catch((e) => {
        errorCallback();
    })
}

// create todo function request
export const createTodo = (todo, callback, errorCallback) => {
    let result = null;
    http.post(createTodoUrl, todo)
    .then((response) => {
        if (response) {
            result = response.data;
            callback(result)
        }
    })
    .catch((e) => {
        errorCallback();
    })
}

// update todo function request
export const updateTodo = (todo_id, todo, callback, errorCallback) => {
    let result = null;
    http.put(`${todosUrl}${todo_id}`, todo)
    .then((response) => {
        if (response) {
            result = response.data;
            callback(result);
        }
    })
    .catch((e) => {
        errorCallback();
    })
}

// delete todo function request
export const deleteTodo = (todo_id, callback, errorCallback) => {
    let result = null;
    http.delete(`${todosUrl}${todo_id}`)
    .then((response) => {
        if (response) {
            result = response.data;
            callback(result);
        }
    })
    .catch((e) => {
        errorCallback();
    })
}