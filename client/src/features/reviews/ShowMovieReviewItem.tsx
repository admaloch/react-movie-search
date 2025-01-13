import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import MovieReviewProps from '../../models/MovieReviewProps';

interface ShowMovieReviewItemProps {
  review: MovieReviewProps;
}

export default function ShowMovieReviewItem({ review }: ShowMovieReviewItemProps): JSX.Element | null {

  if (!review.user) return null;

  const navigate = useNavigate();

  const userLinkHandler = () => {
    navigate(`/profiles/${review.user._id}`);
    document.body.classList.remove('no-scroll');
  };

  return (
    <li className='movie-review-item'>
      <div className="review-header">
        {review.user._id && (
          <span className='user-link' onClick={userLinkHandler}>
            @{review.user.username}
        </span>
        )}
        <Rating
          readonly={true}
          initialRating={review.rating}
          emptySymbol={<FaStar size={12} color="#e4e5e9" />}
          fullSymbol={<FaStar size={12} color="var(--color3)" />}
        />
      </div>

      <p>{review.body}</p>
    </li>
  )
}
