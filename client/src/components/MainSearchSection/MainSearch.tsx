import React from "react";
import { useSearchType } from "../../hooks/useSearchType";
import "./MainSearch.css"
import SearchForm from "../../features/movie-api/search-input/SearchForm.js"
import SearchTypeButtons from "./SearchTypeButtons";
import { MainSearchProps } from '../../models/SliderProps'

function MainSearch({ isSliderActive, hideSlider }: MainSearchProps): JSX.Element {

    const { currType } = useSearchType()
    const currItemHeader = `Search ${currType.description}`
    let sliderClass = isSliderActive ? 'show-slider main-search-section' : 'hide-slider main-search-section'

    return (
        <div className={sliderClass}>
            <h1 className="text-center">{currItemHeader}</h1>
            <SearchTypeButtons hideSlider={hideSlider} />
            <SearchForm />
        </div>
    )
}
export default React.memo(MainSearch)
