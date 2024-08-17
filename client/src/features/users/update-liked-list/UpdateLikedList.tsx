import useAuth from '../../../hooks/useAuth'
import { useGetUserByIdQuery } from '../usersApiSlice';
import ErrorIcon from '@mui/icons-material/Error';

import LoadAnimation from '../../../components/UI/LoadAnimation/LoadAnimation';
import LikeOrDislike from './LIkeOrDislike';
export default function UpdateLikedList({ imdbId, title, size = 'small' }) {

    const { id } = useAuth()

    if (!id) return null

    const { data: user, isLoading, isError, error, isSuccess } = useGetUserByIdQuery(id);

    let content

    if (isLoading) content = <LoadAnimation />

    if (isError || !user) content = <ErrorIcon size={size} />

    if (isSuccess) {
        const { likedMovies } = user
        console.log(id)
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
