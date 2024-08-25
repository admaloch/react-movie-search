
import { useGetReviewsByUserQuery } from './reviewsApiSlice';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import useAuth from '../../hooks/useAuth';
import PopoverIcon from './PopoverIcon';

import Modal from '../../components/UI/Modal';
import { useEffect, useState } from 'react';
import NewReviewForm from './NewReviewForm';
import EditReviewForm from './EditReviewForm';
import DeleteReviewIcon from './DeleteReviewIcon';

export default function ReviewIcon({ imdbId, size, title }) {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeReviewModal = () => {
    setIsModalOpen(false)
  }

  const { id } = useAuth()

  if (!id) return null
  //Movie is liked: grab reviews and see if it is already reviewed
  const { data: reviews, isLoading, isError, error, isSuccess } = useGetReviewsByUserQuery(id);

  if (isLoading) return <PendingIcon />

  if (isError) return <ErrorIcon />

  const openReviewModal = () => {
    setIsModalOpen(true)
  }
  console.log(typeof reviews, reviews)

  const reviewedMovie = reviews.find(review => review.imdbId === imdbId);

  // console.log(reviews.map(review => review.title))

  const popoverText = !reviewedMovie
    ? "Review this movie"
    : "Edit your existing review."

  const modalContent = !reviewedMovie
    ? <NewReviewForm imdbId={imdbId} title={title} closeModal={closeReviewModal} />
    : <EditReviewForm movie={reviewedMovie} closeModal={closeReviewModal} />

  // console.log(reviewedMovie)
  return (
    <>
      <div onClick={openReviewModal}>
        <PopoverIcon popoverText={popoverText}>
          <RateReviewIcon sx={{ fontSize: 30 }} />
        </PopoverIcon>
      </div>

      {reviewedMovie && (
        <div className="delete-review-icon">
          <PopoverIcon popoverText='Delete review'>
            <DeleteReviewIcon imdbId={imdbId} reviewId={reviewedMovie._id} />
          </PopoverIcon>
        </div>

      )
      }
      <Modal
        closeModal={closeReviewModal}
        open={isModalOpen}
      >
        {modalContent}
      </Modal>
    </>
  )
}
