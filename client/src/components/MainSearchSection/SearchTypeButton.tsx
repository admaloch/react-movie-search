import React from "react";
import { SearchTypeBtnProps } from "../../models/SliderProps";
import { useTypeContext } from "../../store/searchTypeContext/TypeContext";
import { useAPIContext } from "../../store/APIContext/APIContext";

const SearchTypeButton = ({ type, isActive, colorScheme, hideSlider }: SearchTypeBtnProps): JSX.Element => {

    const {searchTypeHandler} = useTypeContext()
    const { updateSearchState } = useAPIContext()

    const clickHandler = () => {
        searchTypeHandler(type)
        changeColorVars()
        hideSlider()
        updateSearchState('')
    }

    const changeColorVars = () => {
        const root = document.documentElement;
        return Object.entries(colorScheme).forEach(v => root.style.setProperty(v[0], v[1]));
    }

    return (
        <li
            onClick={clickHandler}
            className={`result-btn ${isActive ? 'active' : ''}`}>
            {type}
        </li>
    )
}
export default React.memo(SearchTypeButton);