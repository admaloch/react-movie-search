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


export default function UserProfile() {

  const [isWatched, setIsWatched] = useState('both')

  const { id } = useParams()

  const { data: user, isLoading, isError, error } = useGetUserByIdQuery(id);

  if (isLoading) return <MainLoadAnimation />;
  if (isError || !user) return <Error text={`Error: ${error.data.message}. Check your internet connection and try again.`} />

  // console.log(user)
  const { username, likedMovies, isAdmin, email } = user

  // console.log(likedMovies)
  const hideSlider = () => {
    return;
  }

  const smallLikedMovies = [likedMovies[0], likedMovies[1]]
  // console.log(smallLikedMovies)
  // console.log(likedMovies)
  return (
    <main className='user-profile-container'>

      <UserInfo user={user} />

      <FilterContentOptions
        hideSlider={hideSlider}
        isWatched={isWatched}
        setIsWatched={setIsWatched}
      />
      <div className="movie-items-container">
        {smallLikedMovies.map((movie) => (
          <LikedMovieItem
            imdbId={movie.imdbId}
            hasWatched={movie.hasWatched}
            key={movie.imdbId}
            isWatchedFilter={isWatched}
          />
        ))}

      </div>
    </main>
  )
}
