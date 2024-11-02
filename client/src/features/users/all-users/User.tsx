
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