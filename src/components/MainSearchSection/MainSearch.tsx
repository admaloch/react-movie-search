import React from "react";
import { useTypeContext } from "../../store/searchTypeContext/TypeContext";
import "./MainSearch.css"
import SearchForm from "./SearchForm.jsx"
import SearchTypeButtons from "./SearchTypeButtons";
import { MainSearchProps } from '../../models/SliderProps'




 function MainSearch({ isSliderActive, hideSlider }: MainSearchProps): JSX.Element {

    const { currType } = useTypeContext()



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

export default React.memo(MainSearch)
