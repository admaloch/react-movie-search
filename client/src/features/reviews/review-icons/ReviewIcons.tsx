
import { useGetReviewsByUserQuery } from '../reviewsApiSlice';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import useAuth from '../../../hooks/useAuth';
import DeleteReviewIcon from './DeleteReviewIcon';
import ReviewIcon from './ReviewIcon';

export default function ReviewIcons({ imdbId, size, title}) {

  //add/edit review icon will trigger modal
  //delete review icon will delete the review



  const { id } = useAuth()

  if (!id) return null

  const { data: reviews, isLoading, isError, error, isSuccess } = useGetReviewsByUserQuery(id);

  if (isLoading) return <PendingIcon />

  if (isError) return <ErrorIcon />

  const reviewedMovie = reviews.find(review => review.imdbId === imdbId);

  return (
    <>
      <ReviewIcon
        reviewedMovie={reviewedMovie}
        imdbId={imdbId}
        title={title}
      />
      {reviewedMovie &&
        <DeleteReviewIcon
          reviewId={reviewedMovie._id}
          imdbId={imdbId}
        />
      }
    </>
  )
}
