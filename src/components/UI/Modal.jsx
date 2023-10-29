
import ReactDOM from 'react-dom';
import './Modal.css';


const Modal = ({ open, children, closeModal }) => {
    if (!open) return null
    // let modalStyle = open
    //     ? { opacity: 1 }
    //     : { opacity: 0 }
  
    

    return ReactDOM.createPortal(
        <>
            <div onClick={closeModal} className="modal-overlay" >
            </div >
            <div className="modal-container ">
                {children}
            </div>
        </>,
        document.getElementById('portal')

    );
};

export default Modal;
