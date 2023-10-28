
import SearchList from "./SearchList";
import { useTheme } from "../../store/APIContext";
import { typeTheme } from "../../store/TypeContext";
import { useEffect, useState } from "react";


const SearchForm = () => {
    const [isListShown, setIsListShown] = useState(false)
    const { searchTerm, handleChange, fetchMovie, submitHandler, setSearchRes } = useTheme()
    const { currType } = typeTheme()
    // const currType = types.filter(item => item.isActive === true)[0]
    const searchParam = currType.apiParam;



    useEffect(
        function fetchMovieInfoOnChange() {
            if (searchTerm.length > 2) {
                fetchMovie(searchParam);
                setIsListShown(true)
            } else {
                setSearchRes({})
                setIsListShown(false)
            }
        },
        [searchTerm]
    )

    const hideSearchList = () => {
        setIsListShown(false)
    }

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
            <SearchList
                searchParam={searchParam}
                isListShown={isListShown}
                hideList={hideSearchList}

            />
        </form>



    )
}
export default SearchForm;