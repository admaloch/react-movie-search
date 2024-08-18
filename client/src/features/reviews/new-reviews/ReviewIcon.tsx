
import { useGetReviewsByIdQuery } from '../reviewsApiSlice';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import useAuth from '../../../hooks/useAuth';
import PopoverIcon from './PopoverIcon';

export default function ReviewIcon({ imdbId, size }) {
  const { id } = useAuth()

  if (!id) return null
  //Movie is liked: grab reviews and see if it is already reviewed
  const { data: reviews, isLoading, isError, error, isSuccess } = useGetReviewsByIdQuery(id);

  if (isLoading) return <PendingIcon />

  if (isError) return <ErrorIcon />

  const alreadyReviewed = reviews.some(review => review.imdbId === imdbId);

  const popoverText = alreadyReviewed
    ? "Review this movie"
    : "Edit your existing review."

  return (
    <>
      <PopoverIcon
        size={size}
        popoverText={popoverText}
      />
      
    </>


  )
}
