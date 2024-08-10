import './UserProfile.css'
import { DUMMY_DATA } from './DummyData';
import LikedMovieItem from './LikedMovieItem';
import SearchTypeButtons from '../../../components/MainSearchSection/SearchTypeButtons';
import { useState } from 'react';
import IsWatchedBtns from './IsWatchedBtns';
import useAuth from '../../../hooks/useAuth';
import { selectUserByUsername } from '../usersApiSlice'
import { useSelector } from 'react-redux';

export default function UserProfile() {
  const { username } = useAuth()

  const user = useSelector(state => selectUserByUsername(state, username));

  if (!user) {
    return <h1>User not found</h1>
  }

  const movieContent = user.likedMovies.length
    ? user.likedMovies.map((movie) => (
      <LikedMovieItem
        imdbId={movie.imdbId}
        hasWatched={movie.hasWatched}
        key={movie.imdbId}
        isWatchedFilter={isWatched}
      />
    ))
    : <h1>You have not liked any movies yet.</h1>

  const [isWatched, setIsWatched] = useState('both')

  const hideSlider = () => {
    return;
  }

  return (
    <main className='user-profile-container'>
      <h1> {user.username}'s Profile</h1>



      <SearchTypeButtons hideSlider={hideSlider} />
      <IsWatchedBtns
        isWatched={isWatched}
        setIsWatched={setIsWatched}
      />
      <div className="movie-items-container">
        {movieContent}

      </div>
    </main>
  )
}
