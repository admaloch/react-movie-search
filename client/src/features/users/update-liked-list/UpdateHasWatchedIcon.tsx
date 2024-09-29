import { useUpdateUserMutation } from '../usersApiSlice'
import ErrorIcon from '@mui/icons-material/Error';
import { toast } from 'react-toastify';
import './LikeIcons.css'
import useAuth from '../../../hooks/useAuth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HourglassLoadingIcon from '../../../components/UI/LoadAnimation/HourglassLoadingIcon.tsx/HourglassLoadingIcon';
import { IconButton } from '@mui/material';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { UpdateHasWatchedProps } from './UpdateHasWatched';

export default function UpdateHasWatchedIcon({ size, imdbId }: UpdateHasWatchedProps): React.JSX.Element | null {

    const { id } = useAuth()

    if (!id || !imdbId) return null

    const [updateUser, {
        isLoading,
        isError,
        error
    }] = useUpdateUserMutation();

    const updateHasWatched = async (event: React.MouseEvent<HTMLElement>) => {
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
        //@ts-ignore
        toast.error(`Error: ${error?.data?.message}`);
        content = <ErrorIcon />;
    }
    else {

        content =
            <IconButton className='custom-icon-button eye-icon' onClick={updateHasWatched} aria-label="update liked list">
                <Tippy content="I've seen this!">
                    <VisibilityIcon
                        className='like-icon'
                        sx={{ fontSize: size, color: 'var(--color1)' }}
                    />
                </Tippy>
            </IconButton>
    }

    return content;
}

