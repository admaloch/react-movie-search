import axios from "axios"
import { useState } from "react"
import { typeCurrentTheme } from "../../store/searchTypeContext/TypeContext"
import ListItemModal from "./ListItemModal"
import '../../../src/declaration.d'
import image_not_found from '../../assets/image_not_found.png'
import { APIResults } from '../../store/APIContext/APIContextInterface'
import APIItem from "../../models/ItemApiProps"
const BASE_URL = 'https://omdbapi.com/?i='
const api_key = '&apikey=84200d7a'



const SearchListItem = ({ imdbID, Poster, Title, Year }: APIResults): React.JSX.Element => {

    const [itemOnClick, setItemOnClick] = useState<APIItem | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const currType = typeCurrentTheme()
    const searchParam = currType.apiParam;

    async function handleListItemClick() {
        genApiRes()
        setIsModalOpen(true)
    }

    async function genApiRes() {
        const apiRes = await axios.get(`${BASE_URL}${imdbID}${api_key}${searchParam}&plot=full`)
        setItemOnClick(apiRes.data)
    }
    const closeItemModal = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <li onClick={handleListItemClick} data-id={imdbID} className="search-list-item">
                <div className="search-item-thumbnail">
                    <img src={Poster !== 'N/A' ? Poster : image_not_found}></img>
                </div>
                <div className="search-item-info">
                    <h3>{Title}</h3>
                    {Year && <p>{Year}</p>}
                </div>
            </li>
            {itemOnClick &&
                <ListItemModal
                    item={itemOnClick}
                    open={isModalOpen}
                    closeModal={closeItemModal}
                />
            }

        </>
    )
}
export default SearchListItem;

