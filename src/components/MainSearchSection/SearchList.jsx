
import { useTheme } from "../../store/APIContext";
import SearchListItem from "./SearchListItem";




const SearchList = ({  isListShown, hideList }) => {



    const { searchRes } = useTheme()
    let searchArr = searchRes.Search
    const listStyle = isListShown ? { display: 'block' } : { display: 'none' }

    document.addEventListener('click', () => hideList())
    document.addEventListener('scroll', () => hideList())

    return (
        <ul style={listStyle} onClick={hideList} className="search-list" id="search-list">
            {searchArr && searchArr.map((item) => (
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


