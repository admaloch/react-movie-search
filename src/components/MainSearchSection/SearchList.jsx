
import { useTheme } from "../../store/APIContext";
import SearchListItem from "./SearchListItem";




const SearchList = ({ isListShown, hideList }) => {



    const { apiResults } = useTheme()

    // let searchArr = apiResults.Search
    // const listStyle = isListShown ? { opacity: 'block' } : { display: 'none' }

    document.addEventListener('click', () => hideList())
    document.addEventListener('scroll', () => hideList())

    return (
        <ul style={{ height: isListShown ? "500px" : "0" }}
            onClick={hideList}
            className="search-list"
            id="search-list">
            {apiResults && apiResults.map((item) => (
                <SearchListItem
                    key={item.imdbID}
                    id={item.imdbID}
                    img={item.Poster}
                    title={item.Title}
                    year={item.Year}

                />
            ))}
        </ul>
    )
}
export default SearchList;


