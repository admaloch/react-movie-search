
import {  useGetUsersQuery } from '../usersApiSlice'
import UserPageLinkIcon from './UserPageLinkIcon';
import ListItemModal from '../../movie-api/ItemModal/ListItemModal';
import { memo } from 'react';
import  { UserItemProps } from '../../../models/UserItemProps';

interface UserProps {   
    userId: string;
}

const User = ({ userId }: UserProps) => {

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    })

   const typedUser = user as UserItemProps

    if (!typedUser || !typedUser.likedMovies.length) return null;

    return (
        <article className="user-container">
            <div className="user-item">
                <h3>{typedUser.username}</h3>
                <ul className="liked-list">
                    {typedUser.likedMovies.map(movie => (
                        <ListItemModal
                            imdbId={movie.imdbId}
                            key={movie._id}
                        >
                            <li className='user-movie-item'>{movie.title}</li>
                        </ListItemModal>
                    ))}
                </ul>
                <UserPageLinkIcon userId={typedUser._id} />
            </div>
        </article>
    )

}
const memoizedUser = memo(User)

export default memoizedUser