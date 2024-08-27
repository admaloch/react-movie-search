
import { useDeleteReviewMutation } from '../reviewsApiSlice';
import useAuth from '../../../hooks/useAuth';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InfoIcon from '@mui/icons-material/Info';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import PopoverIcon from '../PopoverIcon';

export default function DeleteReviewIcon({ imdbId, reviewId }) {
    const { id } = useAuth()

    if (!id) return null

    const [deleteReview, {
        isLoading,
        isError,
        error
    }] = useDeleteReviewMutation()

    const deleteReviewHandler = async () => {
        const id = reviewId
        await deleteReview(id)
    }

    let content;

    if (isLoading) {
        content =
            <>
                <HourglassTopIcon sx={{ fontSize: 25 }} />
                <span>Loading...</span>
            </>
    }

    else if (isError) {
        console.log(`Error: ${error?.data?.message || 'Could not delete review'}`)
        content = <InfoIcon sx={{ fontSize: 25 }} />
    }

    else {
        content =
            <div onClick={deleteReviewHandler}>
                <PopoverIcon popoverText='Delete review'>
                    <DeleteForeverIcon  sx={{ fontSize: 33 }} />
                </PopoverIcon>
            </div>

    }





    return content;
}
