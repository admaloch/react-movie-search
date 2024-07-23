import './UserProfile.css'
import { DUMMY_DATA } from './DummyData';
import LikedMovieItem from './LikedMovieItem';
import SearchTypeButtons from '../MainSearchSection/SearchTypeButtons';
import { useState } from 'react';
import IsWatchedBtns from './IsWatchedBtns';
export default function UserProfile() {
  // console.log(DUMMY_DATA)

  const [isWatched, setIsWatched] = useState('both')



  const hideSlider = () => {
    return;
  }

  return (
    <main className='user-profile-container'>
      <h1>Davis's User Profile</h1>

      <SearchTypeButtons hideSlider={hideSlider} />
      <IsWatchedBtns
        isWatched={isWatched}
        setIsWatched={setIsWatched}
      />
      <div className="movie-items-container">
        {DUMMY_DATA.map((movie) => (
          <LikedMovieItem
            imdbID={movie.imdbID}
            hasWatched={movie.hasWatched}
            key={movie.imdbID}
            isWatchedFilter={isWatched}
          />
        ))}

      </div>
    </main>
  )
}
