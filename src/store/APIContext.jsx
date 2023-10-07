
import React, { useContext, useState } from "react"

const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()
import axios from 'axios';
const BASE_URL = 'https://omdbapi.com/?s='
const api_key = '&apikey=84200d7a'


export function useTheme() {
    return useContext(ThemeContext)
}
export function useThemeUpdate() {
    return useContext(ThemeUpdateContext)
}

export function ThemeProvider({ children }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchRes, setSearchRes] = useState({})

    const handleChange = (e) => {
        setSearchTerm(e.target.value)

    }

    async function fetchMovie(searchParam) {
        const searchResults = await axios.get(`${BASE_URL}${searchTerm}&page=1${api_key}${searchParam}`)
        setSearchRes(searchResults.data)
    }
   
    

    return (
        <ThemeContext.Provider value={{search: searchTerm, result: [searchRes, setSearchRes]}}>
            <ThemeUpdateContext.Provider value={{inputHandler: handleChange, apiHandler: fetchMovie}}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}