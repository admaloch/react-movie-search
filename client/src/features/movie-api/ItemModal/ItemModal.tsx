import React from 'react';
import ModalContent from './ModalContent';
import './ItemModal.css';
import { ModalContentProps } from '../../../models/ListItemProps';
import CircleAnimation from '../../../components/UI/LoadAnimation/CircleAnimation';
import Error from '../../../components/UI/errors/Error';

const ItemModal = ({ item, isLoading, isError }: ModalContentProps): React.JSX.Element => {


    let content;

    if (isLoading) {
        content = <CircleAnimation />
    } else if (isError) {
        content = <Error text={`Error: ${error.data.message} Try refreshing your internet connection and try again.`} />
    } else {
        content = <div className='modal-content-container'>
            
            {item.Poster !== 'N/A' &&
                <div className='modal-img-container'>
                    <img src={item.Poster} alt={`${item.Title} poster`} />
                </div>
            }
            <ModalContent
                item={item}
            />
            
        </div>
    }

    return content;

};

export default ItemModal;
