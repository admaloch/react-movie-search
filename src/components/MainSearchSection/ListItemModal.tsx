import React from 'react'
import ItemModal from '../ItemModal/ItemModal'
import Modal from '../UI/Modal'
import APIItem from "../../models/ItemApiProps"

interface ListItemProps {
    item: APIItem;
    open: Boolean;
    closeModal: () => void;
}

export default function ListItemModal({ item, open, closeModal }: ListItemProps) {

    console.log(item)

    return (
        <Modal
            closeModal={closeModal}
            open={open}
        >
            <ItemModal
                item={item}
            />
        </Modal>
    )
}
