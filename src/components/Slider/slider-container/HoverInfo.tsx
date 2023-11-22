import React, { useState } from "react"
import ItemModal from "../../ItemModal/ItemModal"
import Modal from "../../UI/Modal"
import ItemContent from "./ItemContent"
import HoverInfoProps from "../../../models/HoverInfoProps"
import HoverRequestAnimation from "./HoverRequestAnimation"

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

            {isLoading ? <HoverRequestAnimation isLoading={isLoading} />
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

