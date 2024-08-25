
import { useGetReviewsByMovieQuery } from './reviewsApiSlice';
import CircleAnimation from '../../components/UI/LoadAnimation/CircleAnimation';
import ShowMovieReviewItem from './ShowMovieReviewItem';

export default function ShowMovieReviews({ imdbId }) {

  const { data: movieReviews, isLoading, isError, error, isSuccess } = useGetReviewsByMovieQuery(imdbId);
  let content;
  if (isLoading) content = <CircleAnimation />

  if (isError) {
    console.log(error)
    content = <p>Unable to find content</p>
  }

  // console.log(movieReviews)
  if (isSuccess && !movieReviews.length) {
    content = <div className='no-reviews-yet'>
      <p>This movie has not been reviewed yet.</p>
    </div>
  }
  if (isSuccess && movieReviews.length) {
    content = <ul className='movie-reviews'>
      {movieReviews.map(review => (
        <ShowMovieReviewItem
          key={review._id}
          review={review}
        />
      ))}
    </ul>
  }

  return content;
}
