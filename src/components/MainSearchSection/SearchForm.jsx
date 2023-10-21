
import SearchList from "./SearchList";
import { useTheme } from "../../store/APIContext";
import { useEffect } from "react";


const SearchForm = ({ types }) => {

    const { searchTerm, handleChange, fetchMovie, submitHandler, setSearchRes } = useTheme()
    const currType = types.filter(item => item.isActive === true)[0]
    const searchParam = currType.apiParam;

    useEffect(
        function fetchMovieInfoOnChange() {
            if (searchTerm.length > 2) {
                fetchMovie(searchParam);
            } else {
                setSearchRes({})
            }
        },
        [searchTerm]
    )

    return (
        <form id="searchForm" onSubmit={submitHandler}>
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
            <button>Search</button>
            <SearchList />
        </form>



    )
}
export default SearchForm;