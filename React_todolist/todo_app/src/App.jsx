import { useState } from 'react'
import TodoList from './components/todo_list/TodoList'
import SearchContextProvider from './contexts/SearchContext'

function App() {

  return (
    <>
    {/* wrap the TodoList component by the SearchContextProvider to let the Search Bar to work */}
      <SearchContextProvider>
        <TodoList />
      </SearchContextProvider>
    </>
  )
}

export default App
