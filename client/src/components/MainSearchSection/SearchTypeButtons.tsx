import React from "react";
import { useSearchType } from "../../hooks/useSearchType";
import SearchTypeButton from "./SearchTypeButton";
import { SearchType } from "../../features/search-options/SearchTypeOptions";


const SearchTypeButtons = () => {

    const { searchTypes } = useSearchType()

    return (
        <ul id="result-type-container">
            {searchTypes.map((type: SearchType) => (
                <SearchTypeButton
                    key={type.type}
                    type={type.type}
                    isActive={type.isActive}
                />
            ))}
        </ul>
    )
}
export default React.memo(SearchTypeButtons)