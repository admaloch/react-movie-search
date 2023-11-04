
import { useEffect } from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';


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
                {children}
            </div>
        </>,
        document.getElementById('portal')

    );
};

export default Modal;
