
import ReactDOM from 'react-dom';
import './Modal.css';


const Modal = ({ open, children, closeModal }) => {
    if (!open) return null
    let modalStyle = open
        ? { display: 'flex', opacity: 100 }
        : { display: 'none', opacity: 0 }

    return ReactDOM.createPortal(
        <div onClick={closeModal} className="modal-overlay" style={modalStyle}>
            <div className="modal-container">
                {children}
            </div>
        </div >,
        document.getElementById('portal')
    );
};

export default Modal;
