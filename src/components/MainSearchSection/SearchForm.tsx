
import SearchList from "./SearchList";

import { useTheme } from "../../store/APIContext";
import { typeTheme } from "../../store/TypeContext";
import { useEffect, useState } from "react";

import axios from "axios";
import KeyRequestAnimation from "./KeyRequestAnimation";
const BASE_URL = 'https://omdbapi.com/?s='
const api_key = '&apikey=84200d7a'

const SearchForm = () => {
    const [isListShown, setIsListShown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { searchTerm, updateSearchState, updateSubmittedSearch, updateApiState } = useTheme()
    const { currType } = typeTheme()
    const searchParam = currType.apiParam;

    async function apiRequest() {

        const req1 = await axios.get(`${BASE_URL}${searchTerm}&page=1${api_key}${searchParam}`)
        const req2 = await axios.get(`${BASE_URL}${searchTerm}&page=2${api_key}${searchParam}`)
        let results = []
        if (req1.data.Response === 'True') {
            results = req1.data.Search
            if (req2.data.Response === 'True') {
                results = [...results, ...req2.data.Search]
            }
        }
        setIsLoading(false)
        updateApiState(results)
    }

    useEffect(
        function updateReqOnChange() {
           
                if (searchTerm.length > 2) {
                    setIsListShown(true)
                    setIsLoading(true)
                } else if (searchTerm.length <= 2) {
                    setIsListShown(false)
                    setIsLoading(false)
                    // updateApiState([])
                } else if (searchTerm.length === 0) {
                    updateApiState([])
                }
                apiRequest()
        },
        [searchTerm]
    )

    const hideSearchList = () => {
        setIsListShown(false)
    }

    return (
        <form id="searchForm" onSubmit={updateSubmittedSearch}>
            <input
                type="text"
                className="form-control"
                placeholder={`${currType.description}...`}
                autoComplete="off"
                name="query"
                value={searchTerm}
                id="search-input"
                onChange={(e: React.FormEvent) => updateSearchState(e.target.value)}
            />
            <KeyRequestAnimation isLoading={isLoading} />
            <button>Search</button>
            <SearchList
                isListShown={isListShown}
                hideList={hideSearchList}
            />
        </form>



    )
}
export default SearchForm;