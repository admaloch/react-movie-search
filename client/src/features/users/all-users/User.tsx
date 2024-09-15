
import {  useGetUsersQuery } from '../usersApiSlice'
import UserPageLinkIcon from './UserPageLinkIcon';
import ListItemModal from '../../movie-api/ItemModal/ListItemModal';
import { memo } from 'react';
import  { LikedUserMovies } from '../../../models/UserItemProps';

interface UserProps {   
    userId: string;
}

const User = ({ userId }: UserProps) => {

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    })

    if (!user || !user.likedMovies.length) return null

    const userLikedMovies = user.likedMovies as LikedUserMovies[]

    return (
        <div className="user-container">
            <div className="user-item">
                <h3>{user.username}</h3>
                <ul className="liked-list">
                    {userLikedMovies.map(movie => (
                        <ListItemModal
                            imdbId={movie.imdbId}
                            key={movie._id}
                        >
                            <li className='user-movie-item'>{movie.title}</li>
                        </ListItemModal>
                    ))}
                </ul>
                <UserPageLinkIcon userId={user._id} />
            </div>
        </div>
    )

}
const memoizedUser = memo(User)

export default memoizedUser