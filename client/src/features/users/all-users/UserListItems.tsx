import React, { useState } from 'react'
import MovieItemModal from '../../movie-api/ItemModal/MovieItemModal';

interface UserListItemsProps {
    imdbId: string;
    title: string;
}

export default function UserListItems({imdbId, title}: UserListItemsProps ): React.JSX.Element | null {

     const [isModalOpen, setIsModalOpen] = useState(false)
    
        const closeModal = () => setIsModalOpen(false)
        const listItemClickHandler = () => setIsModalOpen(true)
        
  return (
    <>
        <li onClick={listItemClickHandler}>
            <span className='user-movie-item'>{title}</span>
        </li>
        <MovieItemModal
            imdbId={imdbId}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
        />                    
    </>
  )
}
