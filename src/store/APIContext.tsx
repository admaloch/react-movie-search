import React, { useContext, useState } from "react"
const ThemeContext = React.createContext()

export function useTheme() {
    return useContext(ThemeContext)
}

export function ThemeProvider({ children }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [submittedSearch, setSubmittedSearch] = useState('')
    const [apiResults, setApiResults] = useState([])

    const updateSearchState = (input) => {
        setSearchTerm(input)
    }

    const updateSubmittedSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmittedSearch(searchTerm)
    }

    const updateApiState = (results) => {
        setApiResults(results)
    }

    const ctxObj = {
        searchTerm: searchTerm,
        updateSearchState: updateSearchState,
        submittedSearch: submittedSearch,
        updateSubmittedSearch: updateSubmittedSearch,
        apiResults: apiResults,
        updateApiState: updateApiState,
    }

    return (
        <ThemeContext.Provider value={ctxObj}>
            {children}
        </ThemeContext.Provider>
    )
}