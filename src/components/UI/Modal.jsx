
import ReactDOM from 'react-dom';

import classNamees from './Modal.css';
import ModalContent from './ModalContent';


// const portalElement = document.getElementById('overlays');

const Modal = ({ open, item, setIsModalOpen }) => {

    let modalStyle = open
        ? { display: 'flex', opacity: 100 }
        : { display: 'none', opacity: 0 }



    if (!open) return null

    return ReactDOM.createPortal(

        <div className="modal-overlay" style={modalStyle}>
            <div className="modal-container">
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
