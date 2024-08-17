import SearchList from "./SearchList";
import React, { useEffect } from "react";
import { useSearchType } from "../../../hooks/useSearchType";
import { useState } from "react";
import KeyRequestAnimation from "./KeyRequestAnimation";
import { useOmdbState } from "../../../hooks/useOmdbState";
import { useSearchMoviesQuery } from "../omdbApiSlice";
import useDoubleOmdbRes from "../../../hooks/useDoubleOmdbRes";
import { toast } from "react-toastify";

const SearchForm = (): JSX.Element => {

    const { updateOmdbState } = useOmdbState()
    const [isListShown, setIsListShown] = useState(false)
    const { currType } = useSearchType()
    const [searchInput, setSearchInput] = useState<string>('')
    const currTypeParam = currType.apiParam;

    const { fetchSubmittedResults, isLoading: isSubmitLoading, isSuccess: isSubmitSuccess, isError: isSubmitError, error: submitError } = useDoubleOmdbRes();

    const { data: movieItems, isLoading: isKeyLoading, isSuccess: isKeySuccess, isError, error } = useSearchMoviesQuery(
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

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const omdbResults = await fetchSubmittedResults(searchInput);
            updateOmdbState(searchInput, omdbResults)
        } catch (err) {
            console.error('Error fetching movie results:', err);
            toast.error(`Error: Couldn't locate movies. Try checking your internet connction and trying again`);
        }
    };

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

            <KeyRequestAnimation isLoading={isKeyLoading} />
            <button>
                {isSubmitLoading ? 'Submitting...' : 'Submit'}
            </button>
            {isKeySuccess && Array.isArray(movieItems.Search) && (
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