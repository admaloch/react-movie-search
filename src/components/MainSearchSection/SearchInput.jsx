import { useState } from "react";


const api_key = '&apikey=84200d7a'


const SearchInput = ({ types }) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [searchRes, setSearchRes] = useState({})

    const currType = types.filter(item => item.isActive === true)[0]
    const searchParam = currType.apiParam

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
        if (searchTerm.length > 1) {
            loadMovies(searchTerm)
        }

    }

    async function loadMovies(searchTerm) {
        const URL = `https://omdbapi.com/?s=${searchTerm}&page=1${api_key}${searchParam}`;
        const res = await fetch(`${URL}`);
        const results = await res.json();
        // console.log('results', results)
        setSearchRes(results)
    }

    const handleRequest = () => {
        return loadMovies(searchTerm)
    }
    console.log('search results', searchRes)


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
                onChange={handleChange}

            />
            <button
                type="button"
                onClick={handleRequest}
            >Search</button>
        </>



    )
}
export default SearchInput;