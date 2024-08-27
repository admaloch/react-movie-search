import useAuth from '../../../hooks/useAuth'
import { useGetUserByIdQuery } from '../usersApiSlice';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import LikeOrDislike from './LIkeOrDislike';
import HourglassLoadingIcon from '../../../components/UI/LoadAnimation/HourglassLoadingIcon.tsx/HourglassLoadingIcon';
import { red } from '@mui/material/colors';

export default function UpdateLikedList({ imdbId, title, size = 30 }) {

    const { id } = useAuth()

    if (!id) return null

    const { data: user, isLoading, isError, error, isSuccess } = useGetUserByIdQuery(id);

    let content

    // console.log(user)

    if (isLoading) content =
        <div className="like-icon-container">
            <div className="waiting-icon">
                <HourglassLoadingIcon fontSize='medium' />
            </div>

        </div>

    else if (isError) content =
        <div className="like-icon-container">
            <div className="disable-icon">
                <ErrorIcon fontSize='medium' sx={{ color: red[500] }} />
            </div>
        </div>

    else if (isSuccess) {
        // console.log(user)
        const { likedMovies } = user

        content =
            <LikeOrDislike
                size={size}
                likedMovies={likedMovies}
                imdbId={imdbId}
                title={title}
            />
    }

    return content
}
