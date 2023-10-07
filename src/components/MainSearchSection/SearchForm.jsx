
import SearchList from "./SearchList";
import { useTheme, useThemeUpdate } from "../../store/APIContext";


import { useEffect } from "react";


const SearchForm = ({ types }) => {

    const searchTerm = useTheme().search
    const [searchRes, setSearchRes] = useTheme().result
    const updateThemeObj = useThemeUpdate()
    const handleChange = useThemeUpdate().inputHandler
    const fetchMovie = useThemeUpdate().apiHandler

    const currType = types.filter(item => item.isActive === true)[0]
    const searchParam = currType.apiParam



    useEffect(
        function fetchMovieInfoOnChange() {
            fetchMovie(searchParam);
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