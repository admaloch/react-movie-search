export interface ModalProps {
    closeModal: () => void;
    open: Boolean;
}
export interface OpenModalProps {
    openModal: () => void;
}

export interface MainModalProps extends ModalProps {
    children: JSX.Element;
}