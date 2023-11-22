import React, { useState } from "react"
import ItemModal from "../../ItemModal/ItemModal"
import Modal from "../../UI/Modal"
import ItemContent from "./ItemContent"
import { ModalContentProps } from "../../../models/ListItemProps"


const HoverInfo = ({ item }: ModalContentProps): JSX.Element => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const closeItemModal = () => {
        setIsModalOpen(false)
    }
    const openItemModal = () => {
        setIsModalOpen(true)
    }

    return (
        <div className="info-container">
            <ItemContent
                item={item}
                openItemModal={openItemModal}
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

