

import { useSelector } from 'react-redux'
import { selectUserById } from '../usersApiSlice'
import UsersLikedList from './UserLikedList'

const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))

    if (user) {
        // console.log(user.likedMovies)
        return (
            <div className="user-container">
                <div className="user-item">
                    <h3>{user.username}</h3>
                    <ul className="liked-list">
                        {user.likedMovies?.map(movie => (
                            <li>{movie.title}</li>
                        ))}
                    </ul>
                </div>


            </div>
        )

    } else return null
}
export default User