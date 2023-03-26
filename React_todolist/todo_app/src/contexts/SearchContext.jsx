import React, {useState, useMemo, useContext} from 'react'


// create new context for searching action purpose
export const SearchContext = React.createContext()

// custom useContext to get the SearchContext
export function useSearchContext() {
    return useContext(SearchContext)
}

// create a Provider for the SearchContext
export default function SearchContextProvider({children}) {
    const [query, setQuery] = useState('')
    const search_provider = useMemo(() => ({query, setQuery}), [query, setQuery])
  return (
    <SearchContext.Provider value={{...search_provider}}>
        {children}
    </SearchContext.Provider>
  )
}
