
import { typeTheme } from "../../store/TypeContext";
import "./MainSearch.css"
import SearchForm from "./SearchForm.jsx"
import SearchTypeButtons from "./SearchTypeButtons";



const MainSearch = ({ isSliderActive, hideSlider }) => {

    const { currType } = typeTheme()


    const currItemHeader = `Search ${currType.description}`
    let sliderClass =  isSliderActive ? 'show-slider main-search-section' : 'show-slider main-search-section' 
    

    return (
        <div className={sliderClass}>
            <h1 className="text-center">{currItemHeader}</h1>
            <SearchTypeButtons hideSlider={hideSlider} />
            <SearchForm />
        </div>
    )
}
export default MainSearch;