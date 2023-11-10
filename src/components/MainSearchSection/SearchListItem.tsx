import axios from "axios"
import { useState } from "react"
import { typeTheme } from "../../store/searchTypeContext/TypeContext"
import ListItemModal from "./ListItemModal"
import image_not_found from '../../assets/image_not_found.png'

const BASE_URL = 'https://omdbapi.com/?i='
const api_key = '&apikey=84200d7a'


const SearchListItem = ({ id, img, title, year }) => {

    const [itemOnClick, setItemOnClick] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { currType } = typeTheme()
    const searchParam = currType.apiParam;

    async function handleListItemClick() {
        genApiRes()
        setIsModalOpen(true)
    }

    async function genApiRes() {
        const apiRes = await axios.get(`${BASE_URL}${id}${api_key}${searchParam}&plot=full`)
        setItemOnClick(apiRes.data)
    }

    const closeItemModal = () => {
        setIsModalOpen(false)
    }



    return (
        <>
            <li onClick={handleListItemClick} data-id={id} className="search-list-item">
                <div className="search-item-thumbnail">
                    <img src={img !== 'N/A' ? img : image_not_found}></img>
                </div>
                <div className="search-item-info">
                    <h3>{title}</h3>
                    {year && <p>{year}</p>}
                </div>
            </li>
            <ListItemModal
                item={itemOnClick}
                open={isModalOpen}
                closeModal={closeItemModal}
            />
        </>
    )
}
export default SearchListItem;

