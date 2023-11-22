import React from 'react'
import ItemModal from '../ItemModal/ItemModal'
import Modal from '../UI/Modal'
import { ListItemProps } from '../../models/ListItemProps'
import CircleAnimation from '../UI/LoadAnimation/CircleAnimation'
export default function ListItemModal({ item, open, closeModal, isLoading }: ListItemProps): React.JSX.Element {
    return (
        <Modal
            closeModal={closeModal}
            open={open}
        >
            {isLoading
                ? <CircleAnimation />
                : <ItemModal item={item} />
            }
        </Modal>
    )
}
