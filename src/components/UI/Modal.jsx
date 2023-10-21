
import ReactDOM from 'react-dom';
import './Modal.css';


const Modal = ({ open, children, closeModal }) => {
    if (!open) return null
    let modalStyle = open
        ? { display: 'block', opacity: 100 }
        : { display: 'none', opacity: 0 }

    return ReactDOM.createPortal(
        <>
            <div onClick={closeModal} className="modal-overlay" style={modalStyle}>
            </div >
            <div className="modal-container">
                {children}
            </div>
        </>,
        document.getElementById('portal')

    );
};

export default Modal;
