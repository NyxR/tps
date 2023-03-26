import "./SearchBar.css"
import React from 'react'
import { useSearchContext } from '../../contexts/SearchContext'


// Search Bar component
export default function SearchBar() {
    // use the SearchContext
    const {query, setQuery} = useSearchContext()

    // set the query value when the input search value change
    const handleSearchChange = (e) => {
        setQuery(q => e.target.value)
    }

  return (
    <div className="search-bar">
        <input type="text" name='search' value={query} onChange={handleSearchChange} placeholder="Search"/>
    </div>
  )
}
