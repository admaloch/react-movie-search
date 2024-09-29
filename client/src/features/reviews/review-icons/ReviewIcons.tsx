import './ReviewIcons.css';
import { useGetReviewsByUserQuery } from '../reviewsApiSlice';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import useAuth from '../../../hooks/useAuth';
import DeleteReviewIcon from './DeleteReviewIcon';
import ReviewIcon from './ReviewIcon';
import MovieReviewProps from '../../../models/MovieReviewProps';

export interface ReviewProps {
  imdbId: string;
  title: string;
}

export default function ReviewIcons({ imdbId, title }: ReviewProps): React.JSX.Element | null {

  //add/edit review icon will trigger modal
  //delete review icon will delete the review

  const { id } = useAuth()

  if (!imdbId) return null

  const { data: reviews, isLoading, isError } = useGetReviewsByUserQuery(id);

  if (isLoading) return <PendingIcon />

  if (isError) return <ErrorIcon />

  const typedReviews = reviews as MovieReviewProps[]; 

  const reviewedMovie = typedReviews.find(review => review.imdbId === imdbId);

  if (reviewedMovie) console.log(reviewedMovie)
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
        />
      }
    </>
  )
}
