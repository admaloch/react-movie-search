import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ShowMovieReviewItem({ review }) {
  // console.log(review)
  return (
    <li className='movie-review-item'>
      <div className="review-header">
        <h5 >
          <Link
            className='user-link'
            to={`/profiles/${review.user._id}`}
          >
            @{review.user.username}
          </Link>        </h5>
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
