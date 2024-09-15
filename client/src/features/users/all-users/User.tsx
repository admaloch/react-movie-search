
import {  useGetUsersQuery } from '../usersApiSlice'
import UserPageLinkIcon from './UserPageLinkIcon';
import ListItemModal from '../../movie-api/ItemModal/ListItemModal';
import { memo } from 'react';

const User = ({ userId }) => {

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    })

    if (!user || !user.likedMovies.length) return null

    return (
        <div className="user-container">
            <div className="user-item">
                <h3>{user.username}</h3>
                <ul className="liked-list">
                    {user.likedMovies?.map(movie => (
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