import useAuth from '../../../hooks/useAuth'
import { useGetUserByIdQuery } from '../usersApiSlice';
import ErrorIcon from '@mui/icons-material/Error';
import LikeOrDislike from './LikeOrDislike';
import HourglassLoadingIcon from '../../../components/UI/LoadAnimation/HourglassLoadingIcon.tsx/HourglassLoadingIcon';
import { red } from '@mui/material/colors';
import 'tippy.js/dist/tippy.css';
import { UpdateHasWatchedProps } from './UpdateHasWatched';
import { UserItemProps } from '../../../models/UserItemProps';

interface UpdateLikedListProps extends UpdateHasWatchedProps {
    title: string;
}

export default function UpdateLikedList({ imdbId, title, size = 30 }: UpdateLikedListProps): React.JSX.Element | null {

    const { id } = useAuth()

    if (!id || !imdbId) return null

    const { data: user, isLoading, isSuccess } = useGetUserByIdQuery(id);

    let content

    if (isLoading) {
        content =
            <div className="like-icon-container">
                <div className="waiting-icon">
                    <HourglassLoadingIcon />
                </div>
            </div>
    } else if (isSuccess) {
        const typedUser = user as UserItemProps;
        const { likedMovies } = typedUser
        content =
            <LikeOrDislike
                size={size}
                likedMovies={likedMovies}
                imdbId={imdbId}
                title={title}
            />
    } else {
        content =
            <div className="like-icon-container">
                <div className="disable-icon">
                    <ErrorIcon fontSize='medium' sx={{ color: red[500] }} />
                </div>
            </div>
        //@ts-ignore
        console.log(`Error: ${error?.data?.message || 'Failed to load content.'}`)
    }

    return content
}
