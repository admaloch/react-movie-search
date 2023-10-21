import { useState } from "react"
import ItemModal from "../../ItemModal/ItemModal"
import Modal from "../../UI/Modal"


import BioOverlay from "./BioOverlay"
import ItemInfo from "./ItemInfo"



const HoverInfo = ({ item }) => {
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





    return (

        <div className="info-container">
            <ItemInfo item={item} />
            <div onClick={openBioOverlay} className="hover-btn">Overview</div>
            <BioOverlay revealBio={revealBio} closeBio={closeBioOverlay} plot={item.Plot} />
            <div onClick={() => setIsModalOpen(true)} className="hover-btn">More Information</div>
            <Modal
                closeModal={closeItemModal}
                open={isModalOpen}
            >
                <ItemModal
                    item={item}
                    setIsModalOpen={setIsModalOpen}
                />
            </Modal>



        </div>

    )
}
export default HoverInfo;

