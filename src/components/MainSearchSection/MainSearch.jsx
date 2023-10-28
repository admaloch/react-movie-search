import { typeTheme } from "../../store/TypeContext";
import "./MainSearch.css"
import SearchForm from "./SearchForm.jsx"
import SearchTypeButtons from "./SearchTypeButtons";



const MainSearch = ({ isSliderActive }) => {

    const { currType } = typeTheme()

    const currItemHeader = `Search ${currType.description}`
    let mainStyle = { marginTop: isSliderActive ? '5rem' : '12rem' }

    return (
        <div style={mainStyle} className="main-search-section">
            <h1>{currItemHeader}</h1>
            <SearchTypeButtons />
            <SearchForm />
        </div>
    )
}
export default MainSearch;