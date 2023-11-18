import React from 'react'
import Modal from '../UI/Modal'
import { ModalProps } from '../../models/ModalProps'

export default function InfoModal({ open, closeModal }:ModalProps): JSX.Element {
    return (
        <Modal
            closeModal={closeModal}
            open={open}
        >
            <div className="nav-modal-container">
                <h3>Instructions:</h3>
                <p>Filter the search results by selecting between the menu items</p>
                <p>Search for </p>
                <h4>Information:</h4>
                <p>This was developed by Davis Maloch and is powered by OMDB API.</p>
                <p>For questions or concerns email me @ admaloch91@gmail.com </p>
            </div>
        </Modal>
    )
}