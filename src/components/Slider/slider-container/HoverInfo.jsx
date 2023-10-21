import { useState } from "react"
import Modal from "../../UI/Modal"

import BioOverlay from "./BioOverlay"
import ItemInfo from "./ItemInfo"



const HoverInfo = ({ item }) => {
    const [revealBio, setRevealBio] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const bioHandler = () => {
        setRevealBio(true)
    }

    const closeBio = () => {
        setRevealBio(false)
    }



    return (

        <div className="info-container">
            <ItemInfo item={item} />
            <div onClick={bioHandler} className="hover-btn">Overview</div>
            <BioOverlay revealBio={revealBio} closeBio={closeBio} plot={item.Plot} />
            <div onClick={() => setIsModalOpen(true)} className="hover-btn">More Information</div>
            {<Modal
                item={item}
                open={isModalOpen}
                setIsModalOpen = {setIsModalOpen}
            />}


        </div>

    )
}
export default HoverInfo;

