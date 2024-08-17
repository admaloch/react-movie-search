import LoadAnimation from '../../../components/UI/LoadAnimation/LoadAnimation';
import { useUpdateUserMutation } from '../usersApiSlice'
import ErrorIcon from '@mui/icons-material/Error';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { toast } from 'react-toastify';

export default function LikeOrDislike({ likedMovies, size, title, imdbdId }) {
    // console.log(likedMovies)
    // const alreadyLiked = likedMovies.some(movie => movie.imdbId === imdbId)

    // const [updateUser, {
    //     isLoading,
    //     isSuccess,
    //     isError,
    //     error
    // }] = useUpdateUserMutation()

    // const updateLikedList = async () => {
    //     //backend setup: imdbId + title = add imdbdId = delete
    //     const movieData = !alreadyLiked ? { imdbId, title } : { imdbId }
    //     await updateUser(movieData)
    // }

    // let content;

    // if (isLoading) content = <LoadAnimation />

    // if (isError) {
    //     toast.error(`Error: ${error?.data?.message}`);
    //     content = <ErrorIcon />
    // }

    // if (isSuccess) {
    //     if (!alreadyLiked) {
    //         content = <FavoriteBorderIcon className='like-icon' fontSize={size} onClick={updateLikedList} />
    //     } else {
    //         content = <FavoriteIcon className='like-icon' fontSize={size} onClick={updateLikedList} />
    //     }
    // }

    return (
        // { content }
        <h1>Hello</h1>
    )
}
