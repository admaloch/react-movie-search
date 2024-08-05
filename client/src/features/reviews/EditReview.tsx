import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectReviewById } from './reviewsApiSlice'
import { selectAllUsers } from '../users/usersApiSlice.ts'
import EditReviewForm from './EditReviewForm'


const EditReview = () => {
    const { id } = useParams()

    const review = useSelector(state => selectReviewById(state, id))
    const users = useSelector(selectAllUsers)

    const content = review && users ? <EditReviewForm review={review} users={users} /> : <p>Loading...</p>

    return content
}
export default EditReview