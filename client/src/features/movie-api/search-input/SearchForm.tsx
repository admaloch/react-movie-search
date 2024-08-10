import SearchList from "./SearchList";
import React, { useEffect } from "react";
import { useSearchType } from "../../../hooks/useSearchType";
import { useState } from "react";
import KeyRequestAnimation from "./KeyRequestAnimation";
import { useSearchTerm } from "../../../hooks/useSearchTerm";
import { useSearchMoviesQuery } from "../omdbApiSlice";
import '../MovieItem.css'

const SearchForm = (): JSX.Element => {

    const { searchInputHandler } = useSearchTerm()
    const [isListShown, setIsListShown] = useState(false)
    const { currType } = useSearchType()
    const [searchInput, setSearchInput] = useState<string>('')
    const currTypeParam = currType.apiParam;

    const { data: movieItems, isLoading, isSuccess, isError, error } = useSearchMoviesQuery(
        { searchInput, currTypeParam },
        { skip: searchInput.length < 3 }
    );

    if (isError) {
        console.log(error)
    }

    const showSearchList = () => setIsListShown(true)
    const hideSearchList = () => setIsListShown(false)



    useEffect(() => {
        if (isSuccess && searchInput.length > 2) {
            showSearchList()
        } else {
            hideSearchList()
        }
    }, [isSuccess, searchInput, showSearchList, hideSearchList])



    const formSubmitHandler = (e) => {
        e.preventDefault()
        searchInputHandler(searchInput)
        hideSearchList()
    }



    return (
        <form id="searchForm" onSubmit={formSubmitHandler}>
            <input
                type="text"
                className="form-control"
                placeholder={`${currType.description}...`}
                autoComplete="off"
                name="query"
                value={searchInput}
                id="search-input"
                onChange={(e) => setSearchInput(e.target.value)}
            />

            <KeyRequestAnimation isLoading={isLoading} />
            <button>Search</button>
            {isSuccess && (
                <SearchList
                    isListShown={isListShown}
                    hideList={hideSearchList}
                    movieItems={movieItems.Search}
                />
            )}

        </form>
    )
}
export default React.memo(SearchForm)