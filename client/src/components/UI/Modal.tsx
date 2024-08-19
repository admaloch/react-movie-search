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

export default function Modal({ open, children, closeModal, isTimer = false, isCloseOnClick = true }: MainModalProps): JSX.Element | null {

    const [isVisible, setIsVisible] = useState(false);

    const closeModalHandler = useCallback(() => {
        if (!isTimer && isCloseOnClick) {
            setIsVisible(false);
            closeModal();
        }
    }, [closeModal, isTimer, isCloseOnClick])

    useEffect(() => {
        if (open) {
            setIsVisible(true);
        }
    }, [open]);

    if (!open) return null;

    return ReactDOM.createPortal(
        <>
            <div
                onClick={closeModalHandler}
                className={isVisible ? "modal-overlay active" : "modal-overlay"}
            >
            </div>
            <div className={isVisible ? "modal-container active" : "modal-container"}>
                {children && children}
            </div>
        </>,
        document.getElementById('portal') as Element
    );
}