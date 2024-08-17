import { useState } from "react"
import ItemModal from "../../features/movie-api/ItemModal/ItemModal"
import Modal from "../UI/Modal"
import ItemContent from "./ItemContent"
import HoverInfoProps from "../../models/HoverInfoProps"
import CircleAnimation from "../UI/LoadAnimation/CircleAnimation"
import UpdateLikedList from "../../features/users/update-liked-list/UpdateLikedList"

const HoverInfo = ({ item, isLoading }: HoverInfoProps): JSX.Element => {

    // console.log(item)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const closeItemModal = () => {
        setIsModalOpen(false)
    }
    const openItemModal = () => {
        setIsModalOpen(true)
    }

    return (
        <div className="info-container">
            {isLoading
                ? <CircleAnimation />
                : <ItemContent
                    item={item}
                    openItemModal={openItemModal}
                />
            }
            <UpdateLikedList
                title={item.Title}
                imdbId={item.imdbID}
                size="large"
            />
            <Modal
                closeModal={closeItemModal}
                open={isModalOpen}>
                <ItemModal item={item} />
            </Modal>
        </div>
    )
}
export default HoverInfo;

