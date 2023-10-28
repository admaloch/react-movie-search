
import SearchList from "./SearchList";
import { useTheme } from "../../store/APIContext";
import { typeTheme } from "../../store/TypeContext";
import { useEffect, useState } from "react";


const SearchForm = () => {
    const [isListShown, setIsListShown] = useState(false)
    const { searchTerm, updateSearchState, fetchMovie, updateSubmittedSearch, setSearchRes } = useTheme()
    const { currType } = typeTheme()
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