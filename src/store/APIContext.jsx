
import React, { useContext, useEffect, useState } from "react"
import axios from 'axios';
const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()

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
   
    // const searchParam = currType.apiParam
    const searchParam = '&type=movie'

    useEffect(
        function fetchMovieInfoOnChange() {
            async function fetchMovie() {
                const searchResults = await axios.get(`${BASE_URL}${searchTerm}&page=1${api_key}${searchParam}`)
                setSearchRes(searchResults.data)
            }
            fetchMovie();
        },
        [searchTerm]
    )


    return (
        <ThemeContext.Provider value={{search: searchTerm, result: searchRes}}>
            <ThemeUpdateContext.Provider value={handleChange}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}