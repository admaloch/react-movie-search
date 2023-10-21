import axios from "axios"
import { useState } from "react"

const BASE_URL = 'https://omdbapi.com/?i='
const api_key = '&apikey=84200d7a'


const SearchListItem = ({ id, img, title, year }) => {

    const [itemOnClick, setItemOnClick] = useState({})

    async function handleItemClick() {
        const apiRes = await axios.get(`${BASE_URL}${id}${api_key}${searchParam}&plot=full`)
        setItemOnClick(apiRes.data)
    }


    return (
        <li onClick={handleItemClick} data-id={id} className="search-list-item">
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

