import ReactDOM from "react-dom";
import "./Modal.css";

interface ModalProps {
  closeModal: () => void;
  open: boolean;
  isTimer?: boolean;
  isCloseOnClick?: boolean;
  children: JSX.Element | null;
}

export default function Modal({
  open,
  children,
  closeModal,
}: ModalProps): JSX.Element | null {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div
        onClick={closeModal}
        className={open ? "modal-overlay active" : "modal-overlay"}
      ></div>
      <div
        aria-hidden="false"
        aria-modal="true"
        className={open ? "modal-container active" : "modal-container"}
      >
        {children && children}
      </div>
    </>,
    document.getElementById("portal") as Element,
  );
}
