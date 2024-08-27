import React, { useCallback } from 'react';
import ModalContent from './ModalContent';
import './ItemModal.css';
import { ModalContentProps } from '../../../models/ListItemProps';
import CircleAnimation from '../../../components/UI/LoadAnimation/CircleAnimation';
import ItemError from '../../../components/UI/errors/ItemError';
import CloseIcon from '@mui/icons-material/Close';
import MainLoadAnimation from '../../../components/UI/LoadAnimation/MainLoadAnimation';
import imageNotFound from '../../../assets/image_not_found.png'

const ItemModal = ({ item, isLoading, isError, closeModal, error }: ModalContentProps): React.JSX.Element => {
    if (!item) return null;

    const closeModalHandler = useCallback(() => {
        closeModal();
        document.body.classList.remove('no-scroll');
    }, [closeModal])

    let content;

    // console.log(item)
    const image = item.Poster !== 'N/A' ? item.Poster : imageNotFound
    const imageAlt = item.Poster !== 'N/A' ? `${item.Title}-poster` : 'image not found placeholder'
    const isLoadingg = true

    if (isLoading) content = <MainLoadAnimation />
        
     else if (isError) {
        content =<ItemError text={`Error: ${error?.data?.message || 'Failed to load content.'}`} />  
    } else {
        content = <div className='modal-content-container'>
            <div onClick={closeModalHandler} className="modal-close-icon">
                <CloseIcon fontSize="large" />
            </div>
            <div className='modal-img-container'>
                <img src={image} alt={imageAlt} />
            </div>

            <ModalContent
                item={item}
            />

        </div>
    }

    return content;

};

export default ItemModal;
