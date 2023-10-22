import React from 'react'
import ItemModal from '../ItemModal/ItemModal'
import Modal from '../UI/Modal'

export default function ListItemModal({ item, open, closeModal }) {

    return (
        <Modal
            closeModal={closeModal}
            open={open}
        >
            <ItemModal
                item={item}
                closeModal={closeModal}
            />
        </Modal>
    )
}
