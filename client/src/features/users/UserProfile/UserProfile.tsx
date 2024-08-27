import './UserProfile.css'

import SearchTypeButtons from '../../../components/MainSearchSection/SearchTypeButtons';
import { useState } from 'react';
import IsWatchedBtns from './IsWatchedBtns';
import { selectUserById, useGetUserByIdQuery } from '../usersApiSlice';
import { useParams } from 'react-router-dom'
import CircleAnimation from '../../../components/UI/LoadAnimation/CircleAnimation';
import Error from '../../../components/UI/errors/Error';
import UserInfo from './UserInfo';
import FilterContentOptions from './FilterContentOptions';
import LikedMovieItem from './LikedMovieItem';
import MainLoadAnimation from '../../../components/UI/LoadAnimation/MainLoadAnimation';
import LikedMovieItems from './LikedMovieItems';
import UserSettingsIcon from './UserSettingsIcon';


export default function UserProfile() {

  const [isWatched, setIsWatched] = useState('both')

  const { id } = useParams()

  const { data: user, isLoading, isError, error } = useGetUserByIdQuery(id);

  if (isLoading) return <MainLoadAnimation />;
  else if (isError) return <Error text={`Error: ${error?.data?.message || 'Failed to load content.'}`} />

  // console.log(user)
  const { likedMovies } = user


  const hideSlider = () => { return }


  return (
    <main className='user-profile-container'>

      <UserInfo user={user} />

      <FilterContentOptions
        hideSlider={hideSlider}
        isWatched={isWatched}
        setIsWatched={setIsWatched}
      />
      <LikedMovieItems isWatched={isWatched} likedMovies={likedMovies} />
      <UserSettingsIcon />

    </main>
  )
}
