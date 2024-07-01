import Modal from '../UI/Modal'
import { ModalProps } from '../../models/ModalProps'
import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton } from '@mui/material';


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
                <p>Please checkout my personal Github<a target="_blank" href="https://github.com/admaloch">
                    <IconButton style={{ padding: '0 .1rem' }} className="custom-icon">
                        <GitHubIcon />
                    </IconButton></a>,
                    or work Github<a target="_blank" href="https://github.com/admaloch-dos">
                        <IconButton style={{ padding: '0 .4rem 0 .1rem' }} className="custom-icon">
                            <GitHubIcon />
                        </IconButton></a>
                    to see more of my recent projects. </p>

            </div>
        </Modal >
    )
}