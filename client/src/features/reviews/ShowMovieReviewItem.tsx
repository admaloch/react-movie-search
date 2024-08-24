
export default function ShowMovieReviewItem({review}) {
  console.log(review)
  return (
    <li className='movie-review-item'>
        <p><span>Author:</span> {review.author}</p>
        <p><span>Rating</span>{review.rating}</p>
        <p><span>Body</span>{review.body}</p>
    </li>
  )
}
