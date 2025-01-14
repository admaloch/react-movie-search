
import {  useGetUsersQuery } from '../usersApiSlice'
import UserPageLinkIcon from './UserPageLinkIcon';
import { memo } from 'react';
import  { UserItemProps } from '../../../models/UserItemProps';
import CircleAnimation from '../../../components/UI/LoadAnimation/CircleAnimation';
import UserListItems from './UserListItems';

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

    let reversedLikedMovies = typedUser.likedMovies.slice().reverse()

    let content = null

    if (isLoading) content = <CircleAnimation color='white' />;
    else {
        content =  
        <>
            <h2>{typedUser.username}</h2>
            <ul className="liked-list">
                {reversedLikedMovies.map(movie => (
                   <UserListItems 
                        key={movie._id} 
                        title={movie.title} 
                        imdbId={movie.imdbId}
                    />
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