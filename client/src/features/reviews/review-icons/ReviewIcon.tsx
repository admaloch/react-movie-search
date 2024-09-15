
import RateReviewIcon from '@mui/icons-material/RateReview';
import Modal from '../../../components/UI/Modal';
import { useState } from 'react';
import NewReviewForm from '../NewReviewForm';
import EditReviewForm from '../EditReviewForm';
import IconButton from '@mui/material/IconButton';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import MovieReviewProps from '../../../models/MovieReviewProps';

interface ReviewIconProps  {
    reviewedMovie: MovieReviewProps | undefined;
    imdbId: string;
    title: string;
}

export default function ReviewIcon({ reviewedMovie, imdbId, title }: ReviewIconProps): React.JSX.Element | null {

    // if(!imdbId) return null

    const [isModalOpen, setIsModalOpen] = useState(false)

    const closeReviewModal = () => {
        setIsModalOpen(false)
        document.body.classList.remove('no-scroll');
    }

    const openReviewModal = () => {
        setIsModalOpen(true)
        document.body.classList.add('no-scroll');
    }

    const popoverText = !reviewedMovie
        ? "Review this movie"
        : "Edit your existing review."

    const modalContent = !reviewedMovie
        ? <NewReviewForm imdbId={imdbId} title={title} closeModal={closeReviewModal} />
        : <EditReviewForm movie={reviewedMovie} closeModal={closeReviewModal} />

    return (
        <>
            <IconButton className='custom-icon-button' onClick={openReviewModal} aria-label='open review modal'>
                <Tippy content={popoverText}>
                    <RateReviewIcon sx={{ fontSize: 30 }} />
                </Tippy>
            </IconButton>

            <Modal
                closeModal={closeReviewModal}
                open={isModalOpen}
            >
                {modalContent}
            </Modal>
        </>
    )
}
