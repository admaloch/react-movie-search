import { useTheme } from "../../store/APIContext";
import SearchListItem from "./SearchListItem";




const SearchList = ({ searchParam }) => {
    const { searchRes } = useTheme()
    let searchArr = searchRes.Search

    return (
        <ul className="search-list" id="search-list">
            {searchArr && searchArr.map((item) => (
                <SearchListItem
                    key={item.imdbID}
                    id={item.imdbID}
                    img={item.Poster}
                    title={item.Title}
                    year={item.Year}
                    searchParam={searchParam}
                />
            ))}
        </ul>
    )
}
export default SearchList;


