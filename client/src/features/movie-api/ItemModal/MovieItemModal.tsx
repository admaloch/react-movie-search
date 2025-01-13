import React, { useEffect } from 'react'
import ItemModal from './ItemModal'
import Modal from '../../../components/UI/Modal'
import { useLazyGetMovieByIdQuery } from '../omdbApiSlice'
import { toast } from 'react-toastify'

//this accepts an item like a li or btn as children.. and an imdbId then wraps a div around it and generates a request to omdb endpoint to get the movie by id and displays the movie in a modal

interface MovieItemModalProps {
    imdbId: string | null;
    isModalOpen: boolean;
    closeModal: () => void;
}

export default function MovieItemModal({ imdbId, isModalOpen, closeModal }: MovieItemModalProps): React.JSX.Element | null {

    if (!imdbId) return null;

    const [triggerGetMovieById, { data: movieItem, isLoading, isError, error }] = useLazyGetMovieByIdQuery();

    const closeItemModal = () => {
        closeModal();
        document.body.classList.remove('no-scroll');
    }

    // Effect to run when isModalOpen changes
    useEffect(() => {
        if (isModalOpen) {
            const openModalAndFetchData = async () => {
                document.body.classList.add('no-scroll');
                await triggerGetMovieById(imdbId);
            };
            openModalAndFetchData();
        }
    }, [isModalOpen, imdbId]); // Run effect when isModalOpen or imdbId changes


    if (isError) {
        closeItemModal()
        toast.error(`Error: ${error}`);
        return null;
    }

    return (
        <>
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

