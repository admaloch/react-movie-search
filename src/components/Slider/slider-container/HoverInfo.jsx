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

    item.Plot === 'N/A' && setRevealBio(false)





    return (

        <div className="info-container">
            <ItemInfo item={item} />
            {item.Plot !== 'N/A' &&
                <div
                    onClick={openBioOverlay}
                    className="hover-btn"
                >Overview</div>
            }
            {revealBio && <BioOverlay
                revealBio={revealBio}
                closeBio={closeBioOverlay}
                plot={item.Plot} />}

            <div
                onClick={() => setIsModalOpen(true)}
                className="hover-btn">
                More Information
            </div>
            <Modal
                closeModal={closeItemModal}
                open={isModalOpen}>
                <ItemModal
                    item={item}
                    closeModal={closeItemModal}
                />
            </Modal>



        </div>

    )
}
export default HoverInfo;

