
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useSelector } from 'react-redux'
import { selectUserById } from '../usersApiSlice'
import UsersLikedList from './UserLikedList'
import UserPageLinkIcon from './UserPageLinkIcon';


const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))
console.log(user)
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

                    <UserPageLinkIcon userId={user._id}/>
                </div>


            </div>
        )

    } else return null
}
export default User