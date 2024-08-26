import React, { useState } from 'react'
import { useLazyGetMovieByIdQuery } from '../../movie-api/omdbApiSlice';
import ListItemModal from '../../movie-api/ItemModal/ListItemModal';
import { toast } from 'react-toastify';

export default function LikedMovieList({ title, imdbId }) {

    // console.log(imdbId)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [triggerGetMovieById, { data: movieItem, isLoading, isError, error }] = useLazyGetMovieByIdQuery();

    async function handleListItemClick() {
        // console.log('this clicked')
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
