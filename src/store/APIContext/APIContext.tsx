import React, { useContext, useState } from "react"
import {APIContext, APIResults} from './APIContextInterface'
import TypeProviderContextProps from "../../models/TypeProviderContextProps"
import { Type } from "typescript"

export const ThemeContext = React.createContext<null | APIContext>(null)



export function ThemeProvider({ children }:TypeProviderContextProps): JSX.Element {
    const [searchTerm, setSearchTerm] = useState('')
    const [submittedSearch, setSubmittedSearch] = useState('')
    const [apiResults, setApiResults] = useState<APIResults[]>([])

    const updateSearchState = (input: string): void => {
        setSearchTerm(input)
    }

    const updateSubmittedSearch = (e: React.FormEvent): void => {
        e.preventDefault()
        setSubmittedSearch(searchTerm)
    }

    const updateApiState = (results: APIResults[]): void => {
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
        <ThemeContext.Provider value={{ searchTerm, updateSearchState, submittedSearch, updateSubmittedSearch, apiResults, updateApiState}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const themeContext = useContext(ThemeContext)
    if (!themeContext) throw new Error("You need to use this context inside the provider")
    return themeContext
}