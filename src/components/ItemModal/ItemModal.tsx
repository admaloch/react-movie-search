
import ModalContent from './ModalContent';
import './ItemModal.css';
import APIItem from "../../models/ItemApiProps"

// interface ModalContentProps {
//     item: APIItem;
// }`

const ItemModal = ({ item }) => {
console.log(item)
    
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
