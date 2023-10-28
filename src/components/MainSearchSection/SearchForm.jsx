
import SearchList from "./SearchList";
import { useTheme } from "../../store/APIContext";
import { typeTheme } from "../../store/TypeContext";
import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = 'https://omdbapi.com/?s='
const api_key = '&apikey=84200d7a'

const SearchForm = () => {
    const [isListShown, setIsListShown] = useState(false)
    const { searchTerm, updateSearchState, updateSubmittedSearch, updateApiState } = useTheme()
    const { currType } = typeTheme()
    const searchParam = currType.apiParam;

    async function apiRequest() {
        const req1 = await axios.get(`${BASE_URL}${searchTerm}&page=1${api_key}${searchParam}`)
        const req2 = await axios.get(`${BASE_URL}${searchTerm}&page=2${api_key}${searchParam}`)
        const results = [...req1.data.Search, ...req2.data.Search]
        // console.log(req1)
        // console.log(req2)
        updateApiState(results)
    }

    useEffect(
        function updateReqOnChange() {
            if (searchTerm.length > 0) {
                apiRequest()
                setIsListShown(true)
            } else {
                updateApiState({})
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
                onChange={(e) => updateSearchState(e.target.value)}
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