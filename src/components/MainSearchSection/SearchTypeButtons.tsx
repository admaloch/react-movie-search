import React from "react";
import { useTypeContext } from "../../store/searchTypeContext/TypeContext";
import SearchTypeButton from "./SearchTypeButton";
import { SliderProps } from '../../models/SliderProps'
import { SearchType } from "../../store/searchTypeContext/SearchTypeOptions";

const SearchTypeButtons = ({ hideSlider }: SliderProps) => {

    const {searchTypes} = useTypeContext()

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