import "./TodoItems.css"
import React, {useState, useEffect, useRef, useCallback} from 'react'
import Modal from '../modal/Modal'
import { updateTodo, deleteTodo } from '../../api/requests/todos'
import {FiTrash2, BiEdit} from 'react-icons/all'

// Todo item component

export default function TodoItems({item}) {
    // set States
    const [todo_id, setTodoId] = useState(item.id)
    const [title, setTitle] = useState(item.title)
    const [content, setContent] = useState(item.description)
    const [completed, setCompleted] = useState(item.status)
    const [error, setError] = useState('')
    const [deleted, setDeleted] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    // set input refs
    const inputTitleRef = useRef()
    const inputContentRef = useRef()


    // update todo when it is completed
    const handleCompleted = (e) => {
        // get data to be send to API
        const data = {
            "title": title,
            "description": content,
            "status": e.target.checked
        };
        updateTodo(todo_id, data, (item) => {
            // set completed states
            setCompleted(v => item.status)
        }, () => {
            // in case of error => set the state of error
            setError('Server Error')
        })
    }

    // update todo when change title or content
    const handleUpdateTodo = () => {
        // get data to be send to API
        const data = {
            "title": inputTitleRef.current.value,
            "description": inputContentRef.current.value,
            "status": completed
        };
        updateTodo(todo_id, data, (item) => {
            // update title, content, modal states once update done on the API side
            setTitle(title => item.title)
            setContent(content => item.description)
            setOpenUpdateModal(false)
        }, () => {
            // in case of error => set the state of error
            setError('Server Error')
        })
    }

    // delete todo
    const handleDeleteTodo = () => {
        deleteTodo(todo_id, () => {
            setDeleted(true)
            setOpenDeleteModal(false)
        }, () => {
            // in case of error => set the state of error
            setError('Server Error')
        })
    }

    // render nothing when the item was deleted
    if (deleted){
        return (
            <></>
        )
    } else {
        return (
            <>
            {/* Update Modal */}
            <Modal header="Update Todo" isOpen={openUpdateModal} onClose={() => setOpenUpdateModal(false)}>
                <div className="modal-input-group">
                    <input ref={inputTitleRef} type="text" name='todo-title' defaultValue={title}/>
                </div>
                <div className="modal-input-group">
                    <textarea ref={inputContentRef} name="todo-content" cols="30" rows="10" defaultValue={content}></textarea>
                </div>
                <div className="modal-action-group">
                    <button className="confirm-btn" onClick={handleUpdateTodo}>Update</button>
                </div>
            </Modal>

            {/* Confirm deletion Modal */}
            <Modal header="Confirm Deletion" isOpen={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <div className="modal-message-group">
                    <h2 className="modal-message-title">Confirm to Delete the following todo:</h2>
                    <span>ID:</span> {todo_id} <br/>
                    <span>Title:</span> "{title}"<br/>
                    <span>Description:</span><br/>
                    "{content}"
                </div>
                <div className="modal-action-group">
                    <button className="delete-btn" onClick={handleDeleteTodo}>Confirm</button>
                </div>
            </Modal>

            {/* ToDo item content */}
            <div className='todo-item-wrapper'>
                <div className="todo-item">
                    <div className='todo-details'>
                        <div className="todo-checking">
                            <input type="checkbox" name="todo-check" checked={completed} onChange={handleCompleted}/>
                        </div>
                        <div className='todo-content'>
                            <h3 className="todo-title">{title}</h3>
                            <p className="todo-description">{content}</p>
                        </div>
                    </div>
                    <div className="todo-actions">
                        <button className='todo-delete' disabled={!completed} onClick={() => (completed && setOpenDeleteModal(!openDeleteModal))}><FiTrash2></FiTrash2></button>
                        <button className='todo-update' onClick={()=> setOpenUpdateModal(!openUpdateModal)}><BiEdit></BiEdit></button>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
