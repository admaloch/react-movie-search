
import SearchList from "./SearchList";
import { useTheme } from "../../store/APIContext";
import { typeTheme } from "../../store/TypeContext";
import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = 'https://omdbapi.com/?s='
const api_key = '&apikey=84200d7a'

const SearchForm = () => {
    const [isListShown, setIsListShown] = useState(false)
    const { searchTerm, updateSearchState, updateSubmittedSearch, setApiResults } = useTheme()
    const { currType } = typeTheme()
    const searchParam = currType.apiParam;

    async function apiRequest() {
        const results = await axios.get(`${BASE_URL}${searchTerm}&page=1${api_key}${searchParam}`)
        setApiResults(results.data)
    }

    useEffect(
        function updateReqOnChange() {
            if (searchTerm.length > 2) {
                apiRequest()
                setIsListShown(true)
            } else {
                setApiResults({})
                setIsListShown(false)
            }
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
                onChange={updateSearchState}
            />
            <button>Search</button>
            <SearchList

                isListShown={isListShown}
                hideList={hideSearchList}

            />
        </form>



    )
}
export default SearchForm;