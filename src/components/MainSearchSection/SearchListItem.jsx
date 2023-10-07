

const SearchListItem = ({id, img, title, year}) => {

    return (
        <li data-id={id} className="search-list-item">
            <div className="search-item-thumbnail">
                <img src={img}></img>
            </div>
            <div className="search-item-info">
                <h3>{title}</h3>
                <p>{year}</p>
            </div>
        </li>
    )
}
export default SearchListItem;

{/* <li data-id="tt0020530" className="search-list-item">
            <div className="search-item-thumbnail">
                <img src="https://m.media-amazon.com/images/M/MV5BMjZlY2RjM2ItZGEwOC00ODQwLWFhZDYtMjE3ODMyYWNiOWNlXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"></img>
            </div>
            <div className="search-item-info">
                <h3>An Andalusian Dog</h3>
                <p>1929</p>
            </div>
        </li> */}