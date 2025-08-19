import ReactDOM from "react-dom";
import "./Modal.css";
import { useEffect } from "react";

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
  
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal]);

  return ReactDOM.createPortal(
    <>
      <div
        onClick={closeModal}
        className={open ? "modal-overlay active" : "modal-overlay"}
      ></div>
      <div
        aria-modal="true"
        className={open ? "modal-container active" : "modal-container"}
      >
        {children && children}
      </div>
    </>,
    document.getElementById("portal") as Element
  );
}
