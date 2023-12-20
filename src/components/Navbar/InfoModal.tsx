import Modal from '../UI/Modal'
import { ModalProps } from '../../models/ModalProps'

export default function InfoModal({ open, closeModal }: ModalProps): JSX.Element {
    return (
        <Modal
            closeModal={closeModal}
            open={open}
        >
            <div className="nav-modal-container">
                <h4>Information:</h4>
                <p>This was developed by Davis Maloch with a special thanks to OMDB API.</p>
                <p>For questions or recommended changes, email me at admaloch91@gmail.com </p>
                <p>Please ceckout my personal github <a href="https://github.com/admaloch"></a>, or work github <a href="https://github.com/admaloch-dos"></a>to see more of my recent projects. </p>

            </div>
        </Modal>
    )
}