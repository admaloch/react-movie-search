
import SearchList from "./SearchList";
import { useTheme, useThemeUpdate } from "../../store/APIContext";

const SearchForm = ({ types }) => {
    const searchTerm = useTheme()
    const handleChange = useThemeUpdate()
    const currType = types.filter(item => item.isActive === true)[0]
   


    return (
        <form id="searchForm">
            <input
                type="text"
                className="form-control"
                placeholder={`${currType.description}...`}
                autoComplete="off"
                name="query"
                value={searchTerm}
                id="search-input"
                onChange={handleChange}
            />
            <button type="button">Search</button>
            <SearchList />
        </form>



    )
}
export default SearchForm;