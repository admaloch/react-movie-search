import "./MainSearch.css"
import SearchForm from "./SearchForm.jsx"
import SearchTypeButtons from "./SearchTypeButtons";





const SearchSection = ({ types, handleBtnType }) => {
    const currType = types.filter(item => item.isActive === true)[0].heading





    return (

        <div className="main-search-section">
            <h1>{currType}</h1>
            <SearchTypeButtons
                handleBtnType={handleBtnType}
                types={types} />
            <SearchForm />
        </div>

    )
}
export default SearchSection;