import { useUpdateUserMutation } from '../usersApiSlice'
import ErrorIcon from '@mui/icons-material/Error';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { toast } from 'react-toastify';
import './LikeIcons.css'
import useAuth from '../../../hooks/useAuth';
import { grey, red } from '@mui/material/colors';
import HourglassLoadingIcon from '../../../components/UI/LoadAnimation/HourglassLoadingIcon.tsx/HourglassLoadingIcon';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { IconButton } from '@mui/material';

export default function LikeOrDislike({ likedMovies, size, title, imdbId }) {

    const { id } = useAuth()

    if (!id) return null;

    const alreadyLiked = likedMovies.some(movie => movie.imdbId === imdbId);

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

    if (isLoading) content = <HourglassLoadingIcon />;

    let popoverText = ''

    if (isError) {
        toast.error(`Error: ${error?.data?.message || 'Failed to like item.'}`);
        content = <ErrorIcon />;
    } else if (!alreadyLiked) {

        content =

            <FavoriteBorderIcon
                aria-label='like-icon'
                className='like-icon'
                sx={{ fontSize: size, color: grey[500] }}
                onClick={updateLikedList}
            />;
        popoverText = "Like"
    } else {
        content =
            <FavoriteIcon
                aria-label='like-icon'
                className='like-icon'
                sx={{ fontSize: size, color: red[500] }}
                onClick={updateLikedList}
            />;
        popoverText = "Unlike"

    }

    return (
        <IconButton className='custom-icon-button' aria-label="update liked list">
            <Tippy content={popoverText}>
                {content}
            </Tippy>
        </IconButton>

    ); 
}

