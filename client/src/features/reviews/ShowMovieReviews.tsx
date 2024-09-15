
import { useGetReviewsByMovieQuery } from './reviewsApiSlice';
import CircleAnimation from '../../components/UI/LoadAnimation/CircleAnimation';
import ShowMovieReviewItem from './ShowMovieReviewItem';
import MovieReviewProps from '../../models/MovieReviewProps';

interface ShowMovieReviewsProps {
  imdbId: string;
}

export default function ShowMovieReviews({ imdbId }: ShowMovieReviewsProps): JSX.Element | null {

  // if (!imdbId) return null

  const { data: movieReviews, isLoading, isError, error, isSuccess } = useGetReviewsByMovieQuery(imdbId);
  let content;
  if (isLoading) content = <CircleAnimation />

  if (isError) {
    // @ts-ignore
    const errMsg = `Error: ${error?.data?.message}` || 'Failed to load reviews.'
    console.log(errMsg)
  }

  const typedMovieReviews = movieReviews as MovieReviewProps[];

  if (isSuccess && !typedMovieReviews.length) {
    content = <div className='no-reviews-yet'>
      <p>This movie has not been reviewed yet.</p>
    </div>
  }
  else if (isSuccess && typedMovieReviews.length) {
    content = <ul className='movie-reviews'>
      {typedMovieReviews.map(review => (
        <ShowMovieReviewItem
          key={review._id}
          review={review}
        />
      ))}
    </ul>
  } else {
    content = <p>Unable to find content</p>
  }

  return content;
}
