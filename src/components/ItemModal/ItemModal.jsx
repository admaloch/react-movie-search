
import ModalContent from './ModalContent';
import './ItemModal.css';

const ItemModal = ({ item, setIsModalOpen }) => {
    return (
        <>
            {item.Poster &&
                <img src={item.Poster} alt={`${item.Title} poster`} />
            }
            <ModalContent
                item={item}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
};

export default ItemModal;
