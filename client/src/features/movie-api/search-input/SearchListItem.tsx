import React, { useState } from "react"
import image_not_found from '../../../assets/image_not_found.png'
import UpdateLikedList from "../../users/update-liked-list/UpdateLikedList";
import { SmallOmdbItem } from "../../../models/ItemApiProps";
import MovieItemModal from "../ItemModal/MovieItemModal";

const SearchListItem = ({ imdbID, Poster, Title, Type, Year }: SmallOmdbItem): React.JSX.Element => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const listItemClickHandler = () => {
        setIsModalOpen(true)
    }

    return (
        <>
           <li
                onClick={listItemClickHandler}
                className="search-list-item"
            >
                <div className="search-item-thumbnail">
                        <img width={27} height={50} src={Poster !== 'N/A' ? Poster : image_not_found}></img>
                    </div>
                    <div className="search-item-info">
                        <h3>{Title}</h3>
                        {Year && <p>{Year}</p>}
                    </div>
                    <div className="like-icon-container">
                        <UpdateLikedList
                            title={Title}
                            imdbId={imdbID}
                            type={Type}
                        />
                </div>

            </li>
            <MovieItemModal 
                imdbId={imdbID}
                isModalOpen={isModalOpen}
                closeModal={closeModal}
            />
        </>
    )
}
export default React.memo(SearchListItem);