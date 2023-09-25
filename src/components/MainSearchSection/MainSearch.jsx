import "./MainSearch.css"
import SearchForm from "./SearchForm.jsx"
import SearchTypeButtons from "./SearchTypeButtons";



const MainSearch = ({ types, handleBtnType }) => {

    const currItem = types.filter(item => item.isActive === true)[0]
    const currItemHeader = `Search ${currItem.description}`

    

    return (

        <div className="main-search-section">
            <h1>{currItemHeader}</h1>
            <SearchTypeButtons
                handleBtnType={handleBtnType}
                types={types} />
            <SearchForm />
        </div>

    )
}
export default MainSearch;