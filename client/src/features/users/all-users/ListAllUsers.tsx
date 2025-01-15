import { useGetUsersQuery } from '../usersApiSlice'
import './User.css'
import User from './User'
import { useState } from 'react';
import MovieItemModal from '../../movie-api/ItemModal/MovieItemModal';

export default function ListAllUsers() {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentImdbId, setCurrentImdbId] = useState('');
    
    const closeModal = () => setIsModalOpen(false)

    const {
        data: users,
        isLoading,
        isError,
    } = useGetUsersQuery('usersList', {
        refetchOnFocus: true, // or set to false if you don't need it
        refetchOnMountOrArgChange: false, // avoid refetching on every mount
    });

    let content = null

    if(!users) return null

        const usersIds = users.ids as string[]
        content = (
            <>
                <h1>All Users:</h1>
                <div className="user-list">
                    {usersIds.map(id => 
                    <User 
                        key={id} 
                        userId={id} 
                        isLoading={isLoading}
                        isError={isError}
                        setIsModalOpen={setIsModalOpen}
                        setCurrentImdbId={setCurrentImdbId}
                    />)}
                </div>
                <MovieItemModal imdbId={currentImdbId} isModalOpen={isModalOpen} closeModal={closeModal} />
            </>
        )
    
    
    return (
        <main className="main-item-content all-users-section">
           {content}
        </main>
    );
}
