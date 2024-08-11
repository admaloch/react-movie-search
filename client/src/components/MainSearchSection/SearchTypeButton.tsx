import React from "react";
import { SearchTypeBtnProps } from "../../models/SliderProps";
import { useSearchType } from "../../hooks/useSearchType";
import { useAPIContext } from "../../store/APIContext/APIContext";

const SearchTypeButton = ({ type, isActive, colorScheme, hideSlider }: SearchTypeBtnProps): JSX.Element => {

    const {searchTypeHandler} = useSearchType()
    const { updateSearchState } = useAPIContext()

    const clickHandler = () => {
        searchTypeHandler(type)
        changeColorVars()
        // hideSlider()
        updateSearchState('')
    }

    const changeColorVars = () => {
        const root = document.documentElement;
        return Object.entries(colorScheme).forEach(v => root.style.setProperty(v[0], v[1]));
    }

    return (
        <li
            onClick={clickHandler}
            className={`result-btn ${isActive ? 'active-btn' : ''}`}>
            {type}
        </li>
    )
}
export default React.memo(SearchTypeButton);