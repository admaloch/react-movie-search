import { useState } from "react"
import ItemModal from "../../features/movie-api/ItemModal/ItemModal"
import Modal from "../UI/Modal"
import ItemContent from "./ItemContent"
import HoverInfoProps from "../../models/HoverInfoProps"
import CircleAnimation from "../UI/LoadAnimation/CircleAnimation"
import UpdateLikedList from "../../features/users/update-liked-list/UpdateLikedList"

const HoverInfo = ({ item, isLoading }: HoverInfoProps): JSX.Element => {


    return (
        <div className="info-container">
            {isLoading
                ? <CircleAnimation />
                : <ItemContent
                    item={item}
                />
            }
            <UpdateLikedList
                title={item.Title}
                imdbId={item.imdbID}
                size={30}
            />
           
        </div>
    )
}
export default HoverInfo;

