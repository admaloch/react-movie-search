

const SearchListItem = ({ id, img, title, year }) => {
   
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

