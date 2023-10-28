import { useState } from "react";
import { typeTheme } from "../../store/TypeContext";

const BASE_URL = 'https://omdbapi.com/?s='
const api_key = '&apikey=84200d7a'


const SearchInput = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [setSearchRes] = useState({})
    const { currType } = typeTheme()

    const searchParam = currType.apiParam

    async function loadMovies(searchTerm) {
        const URL = `${BASE_URL}${searchTerm}&page=1${api_key}${searchParam}`;
        const res = await fetch(`${URL}`);
        const results = await res.json();
        // console.log('results', results)
        setSearchRes(results)
    }

    const updateSearchState = (e) => {
        setSearchTerm(e.target.value)
        if (searchTerm.length > 1) {
            loadMovies(searchTerm)
        }

    }

    const handleRequest = () => {
        return loadMovies(searchTerm)
    }

    console.log(searchTerm)

    return (
        <>
            <h1>{searchTerm}</h1>
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
            <button
                type="button"
                onClick={handleRequest}
            >Search</button>
        </>



    )
}
export default SearchInput;