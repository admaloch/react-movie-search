
import ModalContent from './ModalContent';
import './ItemModal.css';

const ItemModal = ({ item, closeModal }) => {
    return (
        <>
            {item.Poster !== 'N/A' &&
                <img src={item.Poster} alt={`${item.Title} poster`} />
            }
            <ModalContent
                item={item}
                closeModal={closeModal}
            />
        </>
    );
};

export default ItemModal;
