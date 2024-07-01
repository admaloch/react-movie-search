import React, { useContext, useState } from "react"
import { APIContextTheme, APIResults } from './APIContextInterface'
import TypeProviderContextProps from "../../models/TypeProviderContextProps"

export const APIContext = React.createContext<null | APIContextTheme>(null)

export function APIProvider({ children }: TypeProviderContextProps): JSX.Element {
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

    const memoizedContextValue = React.useMemo(
        () => ({
            searchTerm, updateSearchState, submittedSearch, updateSubmittedSearch, apiResults, updateApiState
        }),
        [searchTerm, updateSearchState, submittedSearch, updateSubmittedSearch, apiResults, updateApiState]
    )

    return (
        <APIContext.Provider
            value={memoizedContextValue}>
            {children}
        </APIContext.Provider>
    )
}

export function useAPIContext() {
    const apiContext = useContext(APIContext)
    if (!apiContext) throw new Error("You need to use this context inside the provider")
    return apiContext
}