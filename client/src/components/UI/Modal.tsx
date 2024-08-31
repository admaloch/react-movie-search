import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export interface ModalProps {
    closeModal: () => void;
    open: boolean;
    isTimer?: boolean;
    isCloseOnClick?: boolean;
}

export interface MainModalProps extends ModalProps {
    children: JSX.Element | null;
}

export default function Modal({ open, children, closeModal }: MainModalProps): JSX.Element | null {


    // useEffect(() => {
    //     if (open) {
    //         document.body.classList.add('no-scroll');
    //     }
    //    else {
    //         document.body.classList.remove('no-scroll');
    //     }
    // }, [open]);

    if (!open) return null;

    return ReactDOM.createPortal(
        <>
            <div
                onClick={closeModal}
                className={open ? "modal-overlay active" : "modal-overlay"}
            >
            </div>
            <div aria-hidden="false" aria-modal="true" className={open ? "modal-container active" : "modal-container"}>
                {/* <div onClick={closeModalHandler} className="modal-close-icon">
                    <CloseIcon fontSize="large" />
                </div> */}
                {children && children}
            </div>
        </>,
        document.getElementById('portal') as Element
    );
}