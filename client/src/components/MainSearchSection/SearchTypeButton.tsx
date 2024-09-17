import React from "react";
import { useSearchType } from "../../hooks/useSearchType";

interface SearchTypeBtnProps  {
    type: string;
    isActive: Boolean;
}

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