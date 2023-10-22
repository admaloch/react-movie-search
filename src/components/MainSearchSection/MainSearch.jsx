import "./MainSearch.css"
import SearchForm from "./SearchForm.jsx"
import SearchTypeButtons from "./SearchTypeButtons";



const MainSearch = ({ types, handleBtnType, isSliderActive }) => {

    const currItem = types.filter(item => item.isActive === true)[0]
    const currItemHeader = `Search ${currItem.description}`

    let mainStyle = { marginTop: isSliderActive ? '5rem' : '12rem' }

    return (
        <div style={mainStyle} className="main-search-section">
            <h1>{currItemHeader}</h1>
            <SearchTypeButtons
                handleBtnType={handleBtnType}
                types={types} />
            <SearchForm types={types} />
        </div>
    )
}
export default MainSearch;