import "./TodoList.css"
import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react'
import TodoItems from '../todo_items/TodoItems'
import Modal from '../modal/Modal'
import SearchBar from '../search_bar/SearchBar'
import { useSearchContext } from '../../contexts/SearchContext'
import { getTodos, createTodo} from '../../api/requests/todos'



// Filter todo item by a set query
const filterItems = (items, query) => {
    return items.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
}

// Todo List component => contains all todos from API
export default function TodoList() {
    // set States
    const [items, setItems] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [openAddModal, setOpenAddModal] = useState(false)

    // set input refs
    const titleInputRef = useRef()
    const contentInputRef = useRef()

    // use search context in case of using a Search Bar
    const {query} = useSearchContext()

    // load todos from API by using getTodos request
    useEffect(() => {
            setLoading(l => true)
            getTodos((items) => {
                // set items states
                setItems(items)
                setLoading(l => false)
            }, 
            () => {
                setError('Serveur Error')
                setLoading(l => false)
            })
        return () => {
            setLoading(l => false)
        }
    }, [])

    // add new todo by using createTodo
    const addTodo = () => {
        // get value to send
        const new_todo = {
            "title": titleInputRef.current.value,
            "description": contentInputRef.current.value,
            "status": false
          }
        createTodo(new_todo, 
            (item) => {
                // updating items and modal states
                setItems(items => [...items, item])
                setOpenAddModal(false)
        }, () => {
            // in case of error set the states of error
            setError('Serveur Error')
        })
    }

    // set in memory the items to be showed according to the value of the context query
    const searched_items = useMemo(() => {
        return items ? filterItems(items, query): []
    }, [items, query])


  return (
    <div className='todo-list-container'>
        {/* Add Todo Modal */}
        <Modal header="Add New Todo" isOpen={openAddModal} onClose={() => setOpenAddModal(false)}>
            <div className="modal-input-group">
                <input ref={titleInputRef} type="text" name='new_todo_title' placeholder="Todo title"/>
            </div>
            <div className="modal-input-group">
                <textarea ref={contentInputRef} name="todo-content" cols="30" rows="10" placeholder="Todo description"></textarea>
            </div>
            <div className="modal-action-group">
                <button className="confirm-btn" onClick={addTodo}>Confirm</button>
            </div>
        </Modal>

        {/* Todo List Content */}
        <div className="todo-list-wrapper">
            <div className="todo-list-content">
                <div className="todo-list-inner">
                    <div className='heading'>
                        <h2>Todo List App</h2>
                    </div>
                    <div className='main'>
                        <div className="action">
                            <button className='add_todo' onClick={() => setOpenAddModal(!openAddModal)}>New Todo</button>
                            <SearchBar />
                        </div>
                        <div className="todo-list">
                            {/* if loading then show the loading spinner else show all todo items */}
                            {loading ? <p>Loading ............</p> : searched_items && searched_items.map((item) => {
                                return <TodoItems key={item.id} item={item}/>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
