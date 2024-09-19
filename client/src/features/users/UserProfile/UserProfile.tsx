import './UserProfile.css'
import { useState } from 'react';
import { useGetUserByIdQuery } from '../usersApiSlice';
import { useParams } from 'react-router-dom'
import CircleAnimation from '../../../components/UI/LoadAnimation/CircleAnimation';
import Error from '../../../components/UI/errors/Error';
import UserInfo from './UserInfo';
import FilterContentOptions from './FilterContentOptions';
import LikedMovieItems from './LikedMovieItems';
import UserSettingsIcon from './UserSettingsIcon';
import { UserItemProps } from '../../../models/UserItemProps';

export default function UserProfile() {

  const [isWatched, setIsWatched] = useState('both')

  const { id } = useParams()

  let { data: user, isLoading, isError, error } = useGetUserByIdQuery(id);
  if (isLoading) return <CircleAnimation />;
  //@ts-ignore
  else if (isError || !user) return <Error text={`Error: ${error?.data?.message || 'Failed to load content.'}`} />

  const typedUser = user as UserItemProps;

  const { likedMovies } = typedUser

  return (
    <main className='user-profile-container'>

      <UserInfo user={typedUser} />

      <FilterContentOptions
        isWatched={isWatched}
        setIsWatched={setIsWatched}
      />

      <LikedMovieItems isWatched={isWatched} likedMovies={likedMovies} />

      <UserSettingsIcon />

    </main>
  )
}
