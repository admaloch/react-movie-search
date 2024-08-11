import { useState } from "react"
import ItemModal from "../../features/movie-api/ItemModal/ItemModal"
import Modal from "../UI/Modal"
import ItemContent from "./ItemContent"
import HoverInfoProps from "../../models/HoverInfoProps"
import CircleAnimation from "../UI/LoadAnimation/CircleAnimation"

const HoverInfo = ({ item, isLoading }: HoverInfoProps): JSX.Element => {

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

            <Modal
                closeModal={closeItemModal}
                open={isModalOpen}>
                <ItemModal item={item} />
            </Modal>
        </div>
    )
}
export default HoverInfo;

