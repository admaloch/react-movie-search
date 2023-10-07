import { useEffect, useState } from "react";
import SearchList from "./SearchList";
import axios from 'axios';
import { useTheme, useThemeUpdate } from "../../store/APIContext";

const BASE_URL = 'https://omdbapi.com/?s='
const api_key = '&apikey=84200d7a'

const SearchForm = ({ types }) => {
    const searchTerm = useTheme()
    const handleChange = useThemeUpdate()

    const [searchRes, setSearchRes] = useState({})

    const currType = types.filter(item => item.isActive === true)[0]
    const searchParam = currType.apiParam

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

console.log(searchRes)


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