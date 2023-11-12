import React from "react";
import { typeTheme } from "../../store/searchTypeContext/TypeContext";
import "./MainSearch.css"
import SearchForm from "./SearchForm.jsx"
import SearchTypeButtons from "./SearchTypeButtons";
import { MainSearchProps } from '../../models/SliderProps'




export default function MainSearch({ isSliderActive, hideSlider }: MainSearchProps): JSX.Element {

    const { currType } = typeTheme()

    console.log(currType)

    const currItemHeader = `Search ${currType.description}`
    let sliderClass = isSliderActive ? 'show-slider main-search-section' : 'show-slider main-search-section'

    return (
        <div className={sliderClass}>
            <h1 className="text-center">{currItemHeader}</h1>
            <SearchTypeButtons hideSlider={hideSlider} />
            <SearchForm />
        </div>
    )
}
