
import React, { useContext, useState } from "react"

const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()

export function useTheme() {
    return useContext(ThemeContext)
}
export function useThemeUpdate() {
    return useContext(ThemeUpdateContext)
}

export function ThemeProvider({ children }) {
    const [searchTerm, setSearchTerm] = useState('')

    const handleChange = (e) => {
        setSearchTerm(e.target.value)

    }

    


    return (
        <ThemeContext.Provider value={searchTerm}>
            <ThemeUpdateContext.Provider value={handleChange}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}