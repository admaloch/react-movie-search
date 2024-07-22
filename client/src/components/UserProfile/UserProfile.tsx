import './UserProfile.css'
import { DUMMY_DATA } from './DummyData';
import LikedMovieItem from './LikedMovieItem';
export default function UserProfile() {
  // console.log(DUMMY_DATA)


  return (
    <main className='user-profile-container'>
      <h1>Davis's User Profile</h1>
      <div className="movie-items-container">
        {DUMMY_DATA.map((movie) => (
          <LikedMovieItem
            imdbID={movie.imdbID}
            hasWatched={movie.hasWatched}
            key={movie.imdbID}
          />
        ))}

      </div>
    </main>
  )
}
