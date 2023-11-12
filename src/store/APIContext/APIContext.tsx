import React, { useContext, useState } from "react"
import {APIContext, APIResults} from './APIContextInterface'
import TypeProviderContextProps from "../../models/TypeProviderContextProps"
import { Type } from "typescript"
const ThemeContext = React.createContext<null | APIContext>(null)

export function useTheme() {
    return useContext(ThemeContext)
}

export function ThemeProvider({ children }:TypeProviderContextProps): JSX.Element {
    const [searchTerm, setSearchTerm] = useState('')
    const [submittedSearch, setSubmittedSearch] = useState('')
    const [apiResults, setApiResults] = useState<APIResults[]>([])

    const updateSearchState = (input: string) => {
        setSearchTerm(input)
    }

    const updateSubmittedSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmittedSearch(searchTerm)
    }

    const updateApiState = (results: APIResults[]) => {
        setApiResults(results)
    }

    const ctxObj:APIContext = {
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