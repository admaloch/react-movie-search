
import React, { useContext, useState } from "react"

const ThemeContext = React.createContext()
import axios from 'axios';
const BASE_URL = 'https://omdbapi.com/?s='
const api_key = '&apikey=84200d7a'

export function useTheme() {
    return useContext(ThemeContext)
}

export function ThemeProvider({ children }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [submittedSearch, setSubmittedSearch] = useState('')
    const [searchRes, setSearchRes] = useState({})

    console.log(searchRes)

    const updateSearchState = (e) => {
        setSearchTerm(e.target.value)
    }

    const updateSubmittedSearch = (e) => {
        e.preventDefault()
        setSubmittedSearch(searchTerm)

    }

    async function fetchMovie(searchParam) {
        const results = await axios.get(`${BASE_URL}${searchTerm}&page=1${api_key}${searchParam}`)
        setSearchRes(results.data)
    }


    const ctxObj = {
        searchTerm: searchTerm,
        updateSearchState: updateSearchState,
        submittedSearch: submittedSearch,
        updateSubmittedSearch: updateSubmittedSearch,
        searchRes: searchRes,
        fetchMovie: fetchMovie,
        setSearchRes: setSearchRes,
    }

    return (
        <ThemeContext.Provider value={ctxObj}>
            {children}
        </ThemeContext.Provider>
    )
}