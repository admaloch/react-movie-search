
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useSelector } from 'react-redux'
import { selectUserById } from '../usersApiSlice'
import UsersLikedList from './UserLikedList'
import UserPageLinkIcon from './UserPageLinkIcon';
import LikedMovieList from './LikedMovieList';


const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))
    if (!user || !user.likedMovies.length) return null

    // console.log(user.likedMovies)
    return (
        <div className="user-container">
            <div className="user-item">
                <h3>{user.username}</h3>
                <ul className="liked-list">
                    {user.likedMovies?.map(movie => (
                        <LikedMovieList
                            title={movie.title}
                            key={movie._id}
                            imdbId={movie.imdbId}
                        />
                    ))}
                </ul>

                <UserPageLinkIcon userId={user._id} />
            </div>


        </div>
    )


}
export default User