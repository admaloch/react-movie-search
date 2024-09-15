import useAuth from '../../hooks/useAuth';
import { useGetUserByIdQuery } from '../users/usersApiSlice';
import ReviewIcons from './review-icons/ReviewIcons';

export default function HandleReviews({ imdbId, size, title }) {
  //test if movie is liked to determine if review icon shows up
  const { id } = useAuth()

  if (!id) return null

  const { data: user, isError, error } = useGetUserByIdQuery(id);

  if (isError) {
    console.log(`Error: ${error.data.message}`)
    return null;
  }

  const alreadyLiked = user?.likedMovies?.find(movie => movie.imdbId === imdbId);
  const alreadyWatched = alreadyLiked ? alreadyLiked.hasWatched : null

  // if (!alreadyLiked || !alreadyWatched) return null;
  if (!alreadyLiked || !alreadyWatched) return null;

  //click review icon to open modal
  return <ReviewIcons
    title={title}
    imdbId={imdbId}
    size={size}
  />

}
