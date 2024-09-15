import './UserProfile.css'
import LikedMovieItem from './LikedMovieItem';
import { Link } from 'react-router-dom';

export default function LikedMovieItems({ likedMovies, isWatched }) {

    let content

    // const smallMovieList = [likedMovies[0], likedMovies[1]]

    if (likedMovies.length) {
        content =
            <div className="movie-items-container">
                {likedMovies.map((movie) => (
                    <LikedMovieItem
                        imdbId={movie.imdbId}
                        hasWatched={movie.hasWatched}
                        key={movie.imdbId}
                        isWatchedFilter={isWatched}
                    />
                ))}

            </div>
    } else {
        console.log("there aren't any liked movies")
        content =
            <div className="movie-items-container">
                <div className="no-movies-container">
                    <h3>You haven't liked any movies yet. <Link to="/search">Search</Link> around or see what <Link to="/profiles">other users</Link> watching to find your new favorite movies and tv shows.</h3>
                </div>

            </div>
    }

    return content;
}
