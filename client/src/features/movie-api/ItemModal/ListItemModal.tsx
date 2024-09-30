import React, { useState } from 'react'
import ItemModal from './ItemModal'
import Modal from '../../../components/UI/Modal'
import { useLazyGetMovieByIdQuery } from '../omdbApiSlice'
import { toast } from 'react-toastify'

//this accepts an item like a li or btn as children.. and an imdbId then wraps a div around it and generates a request to omdb endpoint to get the movie by id and displays the movie in a modal

interface ListItemModalProps {
    imdbId: string;
    children: JSX.Element;
}

export default function ListItemModal({ children, imdbId }: ListItemModalProps): React.JSX.Element | null {

    if (!imdbId) return null;

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [triggerGetMovieById, { data: movieItem, isLoading, isError, error }] = useLazyGetMovieByIdQuery();

    async function handleClick() {
        setIsModalOpen(true)
        document.body.classList.add('no-scroll');
        await triggerGetMovieById(imdbId);
    }

    const closeItemModal = () => {
        setIsModalOpen(false)
        document.body.classList.remove('no-scroll');
    }

    if (isError) {
        closeItemModal()
        toast.error(`Error: ${error}`);
        return null;
    }

    return (
        <>
            <div onClick={handleClick}>{children}</div>
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

