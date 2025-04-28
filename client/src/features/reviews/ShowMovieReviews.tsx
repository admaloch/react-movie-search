import { useGetReviewsByMovieQuery } from "./reviewsApiSlice";
import ShowMovieReviewItem from "./ShowMovieReviewItem";
import MovieReviewProps from "../../models/MovieReviewProps";
import MovieSkeletonLoader from "../../components/UI/LoadAnimation/MovieSkeletonLoader";

interface ShowMovieReviewsProps {
  imdbId: string;
}

export default function ShowMovieReviews({
  imdbId,
}: ShowMovieReviewsProps): JSX.Element | undefined | null {
  if (!imdbId) return null;

  const {
    data: movieReviews,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetReviewsByMovieQuery(imdbId);
  let content;

  const typedMovieReviews = movieReviews as MovieReviewProps[];

  if (isLoading) {
    content = (
      <div style={{ padding: "0 20px" }}>
        <MovieSkeletonLoader />
      </div>
    );
  } else if (isError) {
    // @ts-ignore
    const errMsg =
      `Error: ${(error as any)?.data?.message}` || "Failed to load reviews.";
    console.log(errMsg);
  } else if (isSuccess && !typedMovieReviews.length) {
    content = (
      <div className="no-reviews-yet">
        <p>This movie has not been reviewed yet.</p>
      </div>
    );
  } else if (isSuccess && typedMovieReviews.length) {
    content = (
      <ul className="movie-reviews">
        {typedMovieReviews.map((review) => (
          <ShowMovieReviewItem key={review._id} review={review} />
        ))}
      </ul>
    );
  } else {
    content = <p>Unable to load reviews.</p>;
  }

  return content;
}
