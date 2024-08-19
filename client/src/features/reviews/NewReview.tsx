import LoadAnimation from '../../components/UI/LoadAnimation/LoadAnimation';
import useAuth from '../../hooks/useAuth';
import { useGetReviewsByIdQuery } from './reviewsApiSlice';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import { useGetUserByIdQuery } from '../users/usersApiSlice';
import ReviewIcon from './ReviewIcon';

export default function NewReview({ imdbId, size, title }) {
  //test if movie is liked to determine if review icon shows up
  const { id } = useAuth()

  if (!id) return null

  const { data: user, isError, error } = useGetUserByIdQuery(id);

  if (isError) {
    console.log(`Error: ${error.data.message}`)
    return null;
  }

  if (user) {
    const alreadyLiked = user.likedMovies.some(movie => movie.imdbId === imdbId);
    if (!alreadyLiked) return null;
  }

  return <ReviewIcon
    title={title}
    imdbId={imdbId}
    size={size}
  />

}
