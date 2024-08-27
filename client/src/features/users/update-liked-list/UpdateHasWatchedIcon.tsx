import { useUpdateUserMutation } from '../usersApiSlice'
import ErrorIcon from '@mui/icons-material/Error';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { toast } from 'react-toastify';
import './LikeIcons.css'
import useAuth from '../../../hooks/useAuth';
import { red } from '@mui/material/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PopoverIcon from '../../reviews/PopoverIcon';
import HourglassLoadingIcon from '../../../components/UI/LoadAnimation/HourglassLoadingIcon.tsx/HourglassLoadingIcon';

export default function UpdateHasWatchedIcon({ size, imdbId }) {

    const { id } = useAuth()

    if (!id) return null


    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation();

    const updateHasWatched = async (event) => {
        console.log('has watched clicked')
        event.stopPropagation()
        const movieData = { imdbId, id, hasWatched: true };
        try {
            await updateUser(movieData).unwrap();
        } catch (err) {
            console.error("Failed to update liked list: ", err);
        }
    };

    let content;

    if (isLoading) content = <HourglassLoadingIcon />;

    if (isError) {
        toast.error(`Error: ${error?.data?.message}`);
        content = <ErrorIcon />;
    }
    else {

        content =
            <PopoverIcon popoverText={"I've seen this"}>
                <VisibilityIcon
                    className='like-icon'
                    sx={{ fontSize: size }}
                    onClick={updateHasWatched}
                />
            </PopoverIcon>
    }

    return (
        <div className="like-icon-container">
            {content}
        </div>
    ); // Return content or a default element
}

