import React, { useCallback } from 'react';
import ModalContent from './ModalContent';
import './ItemModal.css';
import { ModalContentProps } from '../../../models/ListItemProps';
import CircleAnimation from '../../../components/UI/LoadAnimation/CircleAnimation';
import Error from '../../../components/UI/errors/Error';
import CloseIcon from '@mui/icons-material/Close';

const ItemModal = ({ item, isLoading, isError, closeModal }: ModalContentProps): React.JSX.Element => {

    const closeModalHandler = useCallback(() => {
        closeModal();
        document.body.classList.remove('no-scroll');
    }, [closeModal])

    let content;

    if (isLoading) {
        content = <CircleAnimation />
    } else if (isError) {
        content = <Error text={`Error: ${error.data.message} Try refreshing your internet connection and try again.`} />
    } else {
        content = <div className='modal-content-container'>
            <div onClick={closeModalHandler} className="modal-close-icon">
                <CloseIcon fontSize="large" />
            </div> */
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
