
import { useGetReviewsByIdQuery } from './reviewsApiSlice';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import useAuth from '../../hooks/useAuth';
import PopoverIcon from './PopoverIcon';

import Modal from '../../components/UI/Modal';
import { useState } from 'react';
import NewReviewForm from './NewReviewForm';
import EditReviewForm from './EditReviewForm';

export default function ReviewIcon({ imdbId, size, title }) {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeReviewModal = () => {
    setIsModalOpen(false)
  }

  const { id } = useAuth()

  if (!id) return null
  //Movie is liked: grab reviews and see if it is already reviewed
  const { data: reviews, isLoading, isError, error, isSuccess } = useGetReviewsByIdQuery(id);

  if (isLoading) return <PendingIcon />

  if (isError) return <ErrorIcon />

  const openReviewModal = () => {
    setIsModalOpen(true)
  }


  const reviewedMovie = reviews.find(review => review.imdbId === imdbId);

  const popoverText = !reviewedMovie
    ? "Review this movie"
    : "Edit your existing review."

  const modalContent = !reviewedMovie
    ? <NewReviewForm imdbId={imdbId} title={title} closeModal={closeReviewModal} />
    : <EditReviewForm movie={reviewedMovie} closeModal={closeReviewModal} />

    console.log(reviewedMovie)
  return (
    <>
      <div onClick={openReviewModal}>
        <PopoverIcon
          size={size}
          popoverText={popoverText}

        />
      </div>
      <Modal
        closeModal={closeReviewModal}
        open={isModalOpen}
      >
        {modalContent}
      </Modal>
    </>
  )
}
