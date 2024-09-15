
import { useDeleteReviewMutation } from '../reviewsApiSlice';
import useAuth from '../../../hooks/useAuth';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InfoIcon from '@mui/icons-material/Info';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import PopoverIcon from '../PopoverIcon';
import IconButton from '@mui/material/IconButton';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 

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
                <HourglassTopIcon sx={{ fontSize: 27 }} />
            </>
    }

    else if (isError) {
        console.log(`Error: ${error?.data?.message || 'Could not delete review'}`)
        content = <InfoIcon sx={{ fontSize: 25 }} />
    }

    else {
        content =
            <IconButton className='custom-icon-button' onClick={deleteReviewHandler} aria-label="delete">
                <Tippy content="Delete review">
                    <DeleteForeverIcon sx={{ fontSize: 33,color: 'var(--color1)' }} />
                </Tippy>
            </IconButton>

    }

    return content;
}
