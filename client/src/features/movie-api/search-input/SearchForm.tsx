import SearchList from "./SearchList";
import React, { useEffect } from "react";
import { useSearchType } from "../../../hooks/useSearchType";
import { useState } from "react";
import KeyRequestAnimation from "./KeyRequestAnimation";
import { useOmdbState } from "../../../hooks/useOmdbState";
import { useSearchMoviesQuery } from "../omdbApiSlice";
import useDoubleOmdbRes from "../../../hooks/useDoubleOmdbRes";

const SearchForm = (): JSX.Element => {
    const { fetchSubmittedResults, isLoading, isSuccess, isError, error } = useDoubleOmdbRes();
    const { updateOmdbState } = useOmdbState()
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
        if (searchInput.length > 2) {
            showSearchList()
        } else {
            hideSearchList()
        }
    }, [searchInput])

    const formSubmitHandler = async () => {
        if (searchInput.length < 3) {
          return; // Prevent search if input length is less than 3
        }
        try {
          const omdbResults = await fetchSubmittedResults(searchInput);
          updateOmdbState(searchInput, omdbResults, isLoading, isSuccess)
        } catch (err) {
          console.error('Error fetching movie results:', err);
        }
      };

    useEffect(()=>{
        console.log(isListShown)
    }, [isListShown])

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