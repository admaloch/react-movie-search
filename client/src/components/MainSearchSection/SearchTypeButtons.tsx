import React from "react";
import { useSearchType } from "../../hooks/useSearchType";
import SearchTypeButton from "./SearchTypeButton";
import { SliderProps } from '../../models/SliderProps'
import { SearchType } from "../../features/search-options/SearchTypeOptions";

const SearchTypeButtons = ({ hideSlider }: SliderProps) => {
    const { searchTypes } = useSearchType()

    return (

        <ul id="result-type-container">
            {searchTypes.map((type: SearchType) => (
                <SearchTypeButton

                    key={type.type}
                    type={type.type}
                    isActive={type.isActive}
                    colorScheme={type.colorScheme}
                    hideSlider={hideSlider}
                />
            ))}
        </ul>
    )
}
export default React.memo(SearchTypeButtons)