import useAuth from '../../../hooks/useAuth'
import { useGetUserByIdQuery } from '../usersApiSlice';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import LoadAnimation from '../../../components/UI/LoadAnimation/LoadAnimation';
import LikeOrDislike from './LIkeOrDislike';
import HourglassLoadingIcon from '../../../components/UI/LoadAnimation/HourglassLoadingIcon.tsx/HourglassLoadingIcon';
import { red } from '@mui/material/colors';
import UpdateHasWatchedIcon from './UpdateHasWatchedIcon';

export default function UpdateHasWatched({ imdbId, size = 30 }) {

    const { id } = useAuth()

    if (!id) return null

    const { data: user, isLoading, isError, error, isSuccess } = useGetUserByIdQuery(id);

    let content

    // console.log(user)

    if (isLoading) content =
        <div className="like-icon-container">
            <div className="waiting-icon">
                <HourglassTopIcon fontSize='medium' />
            </div>
        </div>

    else if (isError) {
        console.log(`Error: ${error}`)
        content =
            <div className="like-icon-container">
                <div className="disable-icon">
                    <ErrorIcon fontSize='medium' sx={{ color: red[500] }} />
                </div>
            </div>
    }

    else if (isSuccess) {

        const { likedMovies } = user
        const likedMovie = likedMovies.find(movie => movie.imdbId === imdbId);
        if (!likedMovie) return null;
        const alreadyWatched = likedMovie.hasWatched
        if (alreadyWatched) return null;

        content =
            <UpdateHasWatchedIcon
                size={size}
                imdbId={imdbId}
            />
    }

    return content
}
