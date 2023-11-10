
import ModalContent from './ModalContent';
import './ItemModal.css';

const ItemModal = ({ item }) => {

    
    return (
        <div className='modal-content-container'>
            {item.Poster !== 'N/A' &&
            <div className='modal-img-container'>
                <img src={item.Poster} alt={`${item.Title} poster`} />
            </div>
                
            }
            <ModalContent
                item={item}
            />
        </div>
    );
};

export default ItemModal;
