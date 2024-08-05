import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectReviewById } from './reviewsApiSlice'

const Review = ({ reviewId }) => {

    const review = useSelector(state => selectReviewById(state, reviewId))

    const navigate = useNavigate()

    if (review) {
        const created = new Date(review.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(review.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/reviews/${reviewId}`)

        return (
            <tr className="table__row">
                <td className="table__cell review__status">
                    {review.completed
                        ? <span className="review__status--completed">Completed</span>
                        : <span className="review__status--open">Open</span>
                    }
                </td>
                <td className="table__cell review__created">{created}</td>
                <td className="table__cell review__updated">{updated}</td>
                <td className="table__cell review__title">{review.title}</td>
                <td className="table__cell review__username">{review.username}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Review