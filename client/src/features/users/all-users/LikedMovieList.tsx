import React, { useState } from 'react'
import { useLazyGetMovieByIdQuery } from '../../movie-api/omdbApiSlice';
import ListItemModal from '../../movie-api/ItemModal/ListItemModal';
import { toast } from 'react-toastify';

interface LikedMovieListProps {
    title: string;
    imdbId: string;
}

export default function LikedMovieList({ title, imdbId }: LikedMovieListProps): React.JSX.Element | null {

    if(!imdbId) return null;

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [triggerGetMovieById, { data: movieItem, isLoading, isError, error }] = useLazyGetMovieByIdQuery();

    async function handleListItemClick() {
        setIsModalOpen(true)
        triggerGetMovieById(imdbId);
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
            <li className='user-movie-item' onClick={handleListItemClick}>{title}</li>
            <ListItemModal
                item={movieItem}
                open={isModalOpen}
                closeModal={closeItemModal}
                isLoading={isLoading}
                isError={isError}
            />
        </>
    )
}