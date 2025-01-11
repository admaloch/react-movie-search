
import {  useGetUsersQuery } from '../usersApiSlice'
import UserPageLinkIcon from './UserPageLinkIcon';
import ListItemModal from '../../movie-api/ItemModal/ListItemModal';
import { memo } from 'react';
import  { UserItemProps } from '../../../models/UserItemProps';
import CircleAnimation from '../../../components/UI/LoadAnimation/CircleAnimation';

interface UserProps {   
    userId: string;
    isLoading: boolean;
}

const User = ({ userId, isLoading }: UserProps) => {

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    })

   const typedUser = user as UserItemProps

    if (!typedUser || !typedUser.likedMovies.length) return null;

    let content = null

    if (isLoading) content = <CircleAnimation color='white' />;
    else {
        content =  
        <>
         <h2>{typedUser.username}</h2>
         <ul className="liked-list">
            {typedUser?.likedMovies.map(movie => (
                <li key={movie._id}>
                    <ListItemModal imdbId={movie.imdbId}>
                        <span className='user-movie-item'>{movie.title}</span>
                    </ListItemModal>
                </li>
            ))}
        </ul>

        <UserPageLinkIcon userId={typedUser._id} />
        </>
    }
     


    return (
        <article className="user-container">
            <div className="user-item" >
                {content}
            </div>
        </article>
    )

}
const memoizedUser = memo(User)

export default memoizedUser