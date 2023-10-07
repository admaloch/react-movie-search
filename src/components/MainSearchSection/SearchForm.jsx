import { useEffect, useState } from "react";
import SearchList from "./SearchList";
import axios from 'axios';

const BASE_URL = 'https://omdbapi.com/?s='
const api_key = '&apikey=84200d7a'

const SearchForm = ({ types }) => {
    const [searchTerm, setSearchTerm] = useState('')
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

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }


    return (
        <form id="searchForm" onSubmit={handleSubmit}>
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