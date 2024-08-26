
import { useSelector } from 'react-redux'
import { selectUserById } from '../usersApiSlice'
import UserPageLinkIcon from './UserPageLinkIcon';
import ListItemModal from '../../movie-api/ItemModal/ListItemModal';


const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))
    if (!user || !user.likedMovies.length) return null

    return (
        <div className="user-container">
            <div className="user-item">
                <h3>{user.username}</h3>
                <ul className="liked-list">
                    {user.likedMovies?.map(movie => (
                        <ListItemModal
                            imdbId={movie.imdbId}
                            key={movie._id}
                        >
                            <li className='user-movie-item'>{movie.title}</li>
                        </ListItemModal>
                    ))}
                </ul>
                <UserPageLinkIcon userId={user._id} />
            </div>
        </div>
    )


}
export default User