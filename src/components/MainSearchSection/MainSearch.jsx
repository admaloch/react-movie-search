
import { typeTheme } from "../../store/TypeContext";
import "./MainSearch.css"
import SearchForm from "./SearchForm.jsx"
import SearchTypeButtons from "./SearchTypeButtons";



const MainSearch = ({ isSliderActive, hideSlider }) => {

    const { currType } = typeTheme()


    const currItemHeader = `Search ${currType.description}`
    let mainStyle = { marginTop: isSliderActive ? '5rem' : '12rem' }

    return (
        <div style={mainStyle} className="main-search-section">
            <h1 className="text-center">{currItemHeader}</h1>
            <SearchTypeButtons hideSlider={hideSlider} />
            <SearchForm />
        </div>
    )
}
export default MainSearch;