import { useAPIContext } from "../../store/APIContext/APIContext";
import SearchListItem from "./SearchListItem";
import SearchProps from "../../models/SearchProps";

import React from "react";


const SearchList = ({ isListShown, hideList }: SearchProps): React.JSX.Element => {
    const { apiResults } = useAPIContext()
    document.addEventListener('click', () => hideList())
    document.addEventListener('scroll', () => hideList())
    return (
        <ul style={{ height: isListShown ? "300px" : "0", opacity: isListShown ? 1 : 0 }}
            onClick={hideList}
            className="search-list"
            id="search-list">
            {apiResults && apiResults.map((item) => (
                <SearchListItem
                    key={item.imdbID}
                    imdbID={item.imdbID}
                    Poster={item.Poster}
                    Title={item.Title}
                    Year={item.Year}
                />
            ))}
        </ul>
    )
}
export default SearchList;


