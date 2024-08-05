import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice.ts'
import NewReviewForm from './NewReviewForm'

const NewReview = () => {
    const users = useSelector(selectAllUsers)

    const content = users ? <NewReviewForm users={users} /> : <p>Loading...</p>

    return content
}
export default NewReview