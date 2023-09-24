import "./MainSearch.css"
import SearchForm from "./SearchForm.jsx"
import SearchTypeButtons from "./SearchTypeButtons";


const MainSearch = () => {
    return (

        <div className="main-search-section">
            <h1> <span className="title-change">Movie</span> Search</h1>
            <SearchTypeButtons />
            <SearchForm />

        </div>

    )
}
export default MainSearch;