import React, { useState } from 'react'
import ItemModal from './ItemModal'
import Modal from '../../../components/UI/Modal'
import { ListItemProps } from '../../../models/ListItemProps'
import { useLazyGetMovieByIdQuery } from '../omdbApiSlice'
import { toast } from 'react-toastify'

export default function ListItemModal({ children, imdbId }: ListItemProps): React.JSX.Element | null {

    if (!children) return null;

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [triggerGetMovieById, { data: movieItem, isLoading, isError, error }] = useLazyGetMovieByIdQuery();

    async function handleClick() {
        setIsModalOpen(true)
        document.body.classList.add('no-scroll');
        await triggerGetMovieById(imdbId);
    }

    const closeItemModal = () => {
        setIsModalOpen(false)
    }

    if (isError) {
        closeItemModal()
        toast.error(`Error: ${error}`);
    }

    return (
        <>
            {/* Ensure children can receive and handle the click event */}
            {React.Children.map(children, child =>
                React.isValidElement(child)
                    ? React.cloneElement(child, { onClick: handleClick })
                    : child
            )}

            <Modal
                closeModal={closeItemModal}
                open={isModalOpen}
            >
                <ItemModal
                    isError={isError}
                    isLoading={isLoading}
                    item={movieItem}
                    closeModal={closeItemModal}
                    error={error}
                />
            </Modal>
        </>
    );
}

