import React from "react";
import { SearchTypeBtnProps } from "../../models/SliderProps";
import { useSearchType } from "../../hooks/useSearchType";

const SearchTypeButton = ({ type, isActive }: SearchTypeBtnProps): JSX.Element => {

    const {searchTypeHandler} = useSearchType()

    const clickHandler = () => {
        searchTypeHandler(type)
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