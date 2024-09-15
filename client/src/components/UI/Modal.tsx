
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

    if (!open) return null;

    return ReactDOM.createPortal(
        <>
            <div
                onClick={closeModal}
                className={open ? "modal-overlay active" : "modal-overlay"}
            >
            </div>
            <div aria-hidden="false" aria-modal="true" className={open ? "modal-container active" : "modal-container"}>
                {children && children}
            </div>
        </>,
        document.getElementById('portal') as Element
    );
}