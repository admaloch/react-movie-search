import React, { useState } from "react"
import ItemModal from "../../ItemModal/ItemModal"
import Modal from "../../UI/Modal"
import BioOverlay from "./BioOverlay"
import HoverInfoBtn from "./ShowPlotBtn"
import ItemInfo from "./ItemInfo"
import MoreInfoBtn from "./MoreInfoBtn"
import { APIItem } from "../../../models/ItemApiProps"

interface HoverInfoTypes {
    item: APIItem;
}

const HoverInfo = ({ item }: HoverInfoTypes): JSX.Element => {
    const [revealBio, setRevealBio] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const openBioOverlay = () => {
        setRevealBio(true)
    }

    const closeBioOverlay = () => {
        setRevealBio(false)
    }

    const closeItemModal = () => {
        setIsModalOpen(false)
    }
    const openItemModal = () => {
        setIsModalOpen(true)
    }

    return (
        <div className="info-container">
            <ItemInfo item={item} />
            <BioOverlay
                revealBio={revealBio}
                closeBio={closeBioOverlay}
                plot={item.Plot}
            />
            <div className="hover-btn-container">
                {item.Plot !== 'N/A' && <HoverInfoBtn openBioOverlay={openBioOverlay} />}
                <MoreInfoBtn openItemModal={openItemModal} />
            </div>
            <Modal
                closeModal={closeItemModal}
                open={isModalOpen}>
                <ItemModal item={item} />
            </Modal>
        </div>
    )
}
export default HoverInfo;

