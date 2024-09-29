import React from "react"
import ListItemModal from "../ItemModal/ListItemModal"
import image_not_found from '../../../assets/image_not_found.png'
import UpdateLikedList from "../../users/update-liked-list/UpdateLikedList";
import { SmallOmdbItem } from "../../../models/ItemApiProps";

const SearchListItem = ({ imdbID, Poster, Title, Year }: SmallOmdbItem): React.JSX.Element => {

    return (
        <>
            <ListItemModal
                imdbId={imdbID}
            >
                <li className="search-list-item">
                    <div className="search-item-thumbnail">
                        <img src={Poster !== 'N/A' ? Poster : image_not_found}></img>
                    </div>
                    <div className="search-item-info">
                        <h3>{Title}</h3>
                        {Year && <p>{Year}</p>}
                    </div>
                    <div className="like-icon-container">
                        <UpdateLikedList
                            title={Title}
                            imdbId={imdbID}
                        />
                    </div>

                </li>
            </ListItemModal>
        </>
    )
}
export default React.memo(SearchListItem);