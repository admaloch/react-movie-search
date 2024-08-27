import { useState } from 'react'
import InfoModal from '../Navbar/InfoModal'
import { FaCircleInfo } from "react-icons/fa6";

export default function InfoIconModal() {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const closeModal = () => setIsModalOpen(false)
    const openModal = () => setIsModalOpen(true)

    return (
        <>
            <FaCircleInfo onClick={openModal} />
            <InfoModal
                closeModal={closeModal}
                open={isModalOpen}
            />
        </>
    )
}
