import useAuth from '../../../hooks/useAuth'
import { useGetUserByIdQuery } from '../usersApiSlice';
import ErrorIcon from '@mui/icons-material/Error';
import LikeOrDislike from './LikeIcon';
import HourglassLoadingIcon from '../../../components/UI/LoadAnimation/HourglassLoadingIcon.tsx/HourglassLoadingIcon';
import { red } from '@mui/material/colors';
import 'tippy.js/dist/tippy.css';
import { UpdateHasWatchedProps } from './UpdateHasWatched';
import { UserItemProps } from '../../../models/UserItemProps';

interface UpdateLikedListProps extends UpdateHasWatchedProps {
    title: string;
}

export default function UpdateLikedList({ imdbId, title }: UpdateLikedListProps): React.JSX.Element | null {

    const { id } = useAuth()

    if (!id || !imdbId) return null

    const { data: user, isLoading } = useGetUserByIdQuery(id);

    let content

    if (isLoading) {
        content =
            <div className="like-icon-container">
                <div className="waiting-icon">
                    <HourglassLoadingIcon />
                </div>
            </div>
    } else  {
        const typedUser = user as UserItemProps;
        const { likedMovies } = typedUser
        content =
            <LikeOrDislike
                likedMovies={likedMovies}
                imdbId={imdbId}
                title={title}
            />
    } 

    return content
}
