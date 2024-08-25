
export default function ShowMovieReviewItem({review}) {
  // console.log(review)
  return (
    <li className='movie-review-item'>
        <p><span>Username: </span> {review.user.username}</p>
        <p><span>Rating: </span>{review.rating}</p>
        <p><span>Review: </span>{review.body}</p>
    </li>
  )
}
