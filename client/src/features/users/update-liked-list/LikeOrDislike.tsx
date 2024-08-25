import LoadAnimation from '../../../components/UI/LoadAnimation/LoadAnimation';
import { useUpdateUserMutation } from '../usersApiSlice'
import ErrorIcon from '@mui/icons-material/Error';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { toast } from 'react-toastify';
import './LikeIcons.css'
import useAuth from '../../../hooks/useAuth';
import { red } from '@mui/material/colors';

export default function LikeOrDislike({ likedMovies, size, title, imdbId }) {
    const alreadyLiked = likedMovies.some(movie => movie.imdbId === imdbId);

    const { id } = useAuth()

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation();

    const updateLikedList = async (event) => {
        // console.log('this worked')
        event.stopPropagation()
        const movieData = !alreadyLiked ? { imdbId, title, id } : { imdbId, id };
        try {
            await updateUser(movieData).unwrap();
        } catch (err) {
            console.error("Failed to update liked list: ", err);
        }
    };

    let content;

    if (isLoading) content = <LoadAnimation />;

    if (isError) {
        toast.error(`Error: ${error?.data?.message}`);
        content = <ErrorIcon />;
    } else if (!alreadyLiked) {
        content = <FavoriteBorderIcon
            className='like-icon'
            sx={{ fontSize: size }}
            onClick={updateLikedList}
        />;
    } else {
        content = <FavoriteIcon
            className='like-icon'
            sx={{ fontSize: size, color: red[500] }}
            onClick={updateLikedList}
        />;
    }

    return (
        <div className="like-icon-container">
            {content}
        </div>
    ); // Return content or a default element
}

