import React, { useCallback } from 'react';
import ModalContent from './ModalContent';
import './ItemModal.css';
import CircleAnimation from '../../../components/UI/LoadAnimation/CircleAnimation';
import ItemError from '../../../components/UI/errors/ItemError';
import CloseIcon from '@mui/icons-material/Close';
import imageNotFound from '../../../assets/image_not_found.png'
import { OmdbItemWithRTK } from '../../../models/ItemApiProps';

interface ItemModalInterface extends OmdbItemWithRTK {
    closeModal: () => void;
}

const ItemModal = ({ item, isLoading, isError, closeModal, error }: ItemModalInterface): React.JSX.Element | null => {

    if (!item) return null;

    const closeModalHandler = useCallback(() => {
        closeModal();
        document.body.classList.remove('no-scroll');
    }, [closeModal])

    let content;

    const image = item.Poster !== 'N/A' ? item.Poster : imageNotFound
    const imageAlt = item.Poster !== 'N/A' ? `${item.Title}-poster` : 'image not found placeholder'

    if (isLoading) content = <CircleAnimation />
    else if (isError) {
        // @ts-ignore
        content = <ItemError text={`Error: ${error?.data?.message || 'Failed to load content.'}`} />
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
