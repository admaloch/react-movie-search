
import ReactDOM from 'react-dom';
import './Modal.css';
import ModalContent from './ModalContent';

const Modal = ({ open, item, setIsModalOpen }) => {
    if (!open) return null
    let modalStyle = open
        ? { display: 'flex', opacity: 100 }
        : { display: 'none', opacity: 0 }

    return ReactDOM.createPortal(
        <div onClick={() => setIsModalOpen(false)} className="modal-overlay" style={modalStyle}>
            <div onClick={() => setIsModalOpen(true)} className="modal-container">
                {item.Poster &&
                    <img src={item.Poster} alt={`${item.Title} poster`} />
                }
                <ModalContent
                    item={item}
                    setIsModalOpen={setIsModalOpen}
                />
            </div>
        </div >,
        document.getElementById('portal')
    );
};

export default Modal;
