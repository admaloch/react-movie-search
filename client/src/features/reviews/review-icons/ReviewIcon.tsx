
import RateReviewIcon from '@mui/icons-material/RateReview';
import PopoverIcon from '../PopoverIcon';
import Modal from '../../../components/UI/Modal';
import {useState } from 'react';
import NewReviewForm from '../NewReviewForm';
import EditReviewForm from '../EditReviewForm';

export default function ReviewIcon({ reviewedMovie, imdbId, title }) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const closeReviewModal = () => {
        setIsModalOpen(false)
    }

    const openReviewModal = () => {
        setIsModalOpen(true)
    }

    const popoverText = !reviewedMovie
        ? "Review this movie"
        : "Edit your existing review."

    const modalContent = !reviewedMovie
        ? <NewReviewForm imdbId={imdbId} title={title} closeModal={closeReviewModal} />
        : <EditReviewForm movie={reviewedMovie} closeModal={closeReviewModal} />

    return (
        <>
            <PopoverIcon popoverText={popoverText} >
                <RateReviewIcon
                    onClick={openReviewModal}
                    sx={{ fontSize: 30 }}
                />
            </PopoverIcon>
            <Modal
                closeModal={closeReviewModal}
                open={isModalOpen}
            >
                {modalContent}
            </Modal>
        </>
    )
}
