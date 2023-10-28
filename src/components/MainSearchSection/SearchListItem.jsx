import axios from "axios"
import { useState } from "react"
import ListItemModal from "./ListItemModal"

const BASE_URL = 'https://omdbapi.com/?i='
const api_key = '&apikey=84200d7a'


const SearchListItem = ({ id, img, title, year, searchParam }) => {

    const [itemOnClick, setItemOnClick] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)

    async function handleItemClick() {
        const apiRes = await axios.get(`${BASE_URL}${id}${api_key}${searchParam}&plot=full`)
        setItemOnClick(apiRes.data)
        setIsModalOpen(true)
    }



    const closeItemModal = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <li onClick={handleItemClick} data-id={id} className="search-list-item">
                <div className="search-item-thumbnail">
                    <img src={img}></img>
                </div>
                <div className="search-item-info">
                    <h3>{title}</h3>
                    <p>{year}</p>
                </div>
            </li>
            <ListItemModal 
            item={itemOnClick} 
            open={isModalOpen}
            closeModal = {closeItemModal}
            />
        </>
    )
}
export default SearchListItem;

