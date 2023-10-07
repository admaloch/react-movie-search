
import SearchList from "./SearchList";
import { useTheme, useThemeUpdate } from "../../store/APIContext";

import axios from 'axios';
import { useEffect } from "react";
const BASE_URL = 'https://omdbapi.com/?s='
const api_key = '&apikey=84200d7a'

const SearchForm = ({ types }) => {
    const contextObj = useTheme()
    const searchTerm = contextObj.search
    const [searchRes, setSearchRes] = contextObj.result
    const handleChange = useThemeUpdate()
    const currType = types.filter(item => item.isActive === true)[0]

        const searchParam = currType.apiParam
        // const searchParam = '&type=movie'

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
        <form id="searchForm">
            <input
                type="text"
                className="form-control"
                placeholder={`${currType.description}...`}
                autoComplete="off"
                name="query"
                value={searchTerm}
                id="search-input"
                onChange={handleChange}
            />
            <button type="button">Search</button>
            <SearchList />
        </form>



    )
}
export default SearchForm;