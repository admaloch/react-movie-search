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
import { LikedUserMovies } from '../../../models/UserItemProps';

interface LikeOrDislikeProps {
    likedMovies: LikedUserMovies[];
    size: number
    title: string;
    imdbId: string;
}

export default function LikeOrDislike({ likedMovies, size, title, imdbId }: LikeOrDislikeProps) {

    const { id } = useAuth()

    if (!id) return null;

    const alreadyLiked = likedMovies.some(movie => movie.imdbId === imdbId);

    const [updateUser, {
        isLoading,
        isError,
        error
    }] = useUpdateUserMutation();

    const updateLikedList = async (event: React.MouseEvent<HTMLElement>) => {
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
        //@ts-ignore
        toast.error(`Error: ${error?.data?.message || 'Failed to like item.'}`);
        content = <ErrorIcon />;
    } else if (!alreadyLiked) {

        content =
            <FavoriteBorderIcon
                aria-label='like-icon'
                className='like-icon'
                sx={{ fontSize: size, color: grey[500] }}
            />;
        popoverText = "Like"
    } else {
        content =
            <FavoriteIcon
                aria-label='like-icon'
                className='like-icon'
                sx={{ fontSize: size, color: red[500] }}
            />;
        popoverText = "Unlike"

    }

    return (
        <IconButton onClick={updateLikedList} className='custom-icon-button' aria-label="update liked list">
            <Tippy content={popoverText}>
                {content}
            </Tippy>
        </IconButton>

    );
}

