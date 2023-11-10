
import { useEffect } from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ open, children, closeModal }) => {


    const [isVisible, setIsVisible] = useState(false)



    const closeModalHandler = () => {
        setIsVisible(false)
        setTimeout(() => {
            closeModal()
        }, 1000)
    }

    useEffect(() => {
        if (open) {
            setIsVisible(true)
        }
    }, [open])

    if (!open) return null

    return ReactDOM.createPortal(
        <>
            <div
                onClick={closeModalHandler}
                className={isVisible ? "modal-overlay active" : "modal-overlay"} >
            </div >
            <div
                className={isVisible ? "modal-container active" : "modal-container"}
            >
                <CloseIcon
                    onClick={closeModalHandler}
                    className='modal-close-icon'
                    sx={{ position: 'absolute', top: 15, right: 15, fontSize: 25 }} />
                {children}
            </div>
        </>,
        document.getElementById('portal')

    );
};

export default Modal;
