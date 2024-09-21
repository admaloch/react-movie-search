import ReactDOM from 'react-dom';

interface ModalProps {
    closeModal: () => void;
    open: boolean;
    isTimer?: boolean;
    isCloseOnClick?: boolean;
    children: JSX.Element | null;
}

export default function Modal({ open, children, closeModal }: ModalProps): JSX.Element | null {
    if (!open) return null;

    const portalTarget = document.getElementById('portal');

    // TypeScript expects that the portalTarget is not null, so we can add a check or cast it safely
    if (!portalTarget) return null; // To handle potential DOM issues.

    return ReactDOM.createPortal(
        <>
            <div
                onClick={closeModal}
                className={open ? "modal-overlay active" : "modal-overlay"}
            ></div>
            <div aria-hidden="false" aria-modal="true" className={open ? "modal-container active" : "modal-container"}>
                {children}
            </div>
        </>,
        portalTarget
    );
}
