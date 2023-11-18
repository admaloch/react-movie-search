import React from 'react'
import ItemModal from '../ItemModal/ItemModal'
import Modal from '../UI/Modal'
import { ListItemProps } from '../../models/ListItemProps'

export default function ListItemModal({ item, open, closeModal }: ListItemProps): React.JSX.Element {
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
