import React from 'react';
import ModalContent from './ModalContent';
import './ItemModal.css';
import { ModalContentProps } from '../../models/ListItemProps';

const ItemModal = ({ item }: ModalContentProps): React.JSX.Element => {

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
