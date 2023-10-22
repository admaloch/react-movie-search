import React from 'react'
import ItemModal from '../ItemModal/ItemModal'
import Modal from '../UI/Modal'

export default function ListItemModal({ item,  }) {

    return (
        <Modal
            closeModal={closeItemModal}
            open={isModalOpen}
        >
            <ItemModal
                item={item}
                setIsModalOpen={setIsModalOpen}
            />
        </Modal>
    )
}
