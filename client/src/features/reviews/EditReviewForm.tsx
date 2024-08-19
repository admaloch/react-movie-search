import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useUpdateReviewMutation } from './reviewsApiSlice';
import useAuth from '../../hooks/useAuth';
import './Reviews.css'
import CloseIcon from '@mui/icons-material/Close';





const EditReviewForm = ({ closeModal, movie }) => {

  const { body, title, _id, rating } = movie

  let defaultRating = parseInt(rating)

  console.log(defaultRating)

  const { id } = useAuth()

  if (!id) return null

  const { register, handleSubmit, formState: { errors } } = useForm({
  });

  const [updateReview, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateReviewMutation()


  const submitForm: SubmitHandler<IFormInput> = async (data) => {
    try {
      await updateReview({ ...data, reviewId: _id }).unwrap();
    } catch (err) {
      console.log('Error', err)
    }
  };


  useEffect(() => {
    if (isSuccess) {
      toast.success('Review successfully updated');
      setTimeout(() => {
        closeModal()
      }, 2300);
    }
    if (isError) {
      toast.error(`Error: ${error?.data?.message || 'Failed to update review. Try again later.'}`);
    }
  }, [isSuccess, isError, error]);

  return (
    <>
      <div className="review-form">
        <div onClick={() => closeModal()} className="close-modal-icon">
          <CloseIcon fontSize="large" />
        </div>
        <form onSubmit={handleSubmit(submitForm)}>
          <h2>Review for {title}</h2>

          <div className="form-group review-star-input">
            <label htmlFor="rating">Star Rating:</label>
            <div className="starability-basic">
              <input
                type="radio"
                id="rate-1"
                value={1}
                {...register('rating', { required: true, valueAsNumber: true })}
                checked={defaultRating === 1} // Check if rating is 1
              />
              <label htmlFor="rate-1" title="Terrible">1 star</label>

              <input
                type="radio"
                id="rate-2"
                value={2}
                {...register('rating', { required: true, valueAsNumber: true })}
                checked={defaultRating === 2} // Check if rating is 2
              />
              <label htmlFor="rate-2" title="Not good">2 stars</label>

              <input
                type="radio"
                id="rate-3"
                value={3}
                {...register('rating', { required: true, valueAsNumber: true })}
                checked={defaultRating === 3} // Check if rating is 3
              />
              <label htmlFor="rate-3" title="Average">3 stars</label>

              <input
                type="radio"
                id="rate-4"
                value={4}
                {...register('rating', { required: true, valueAsNumber: true })}
                checked={defaultRating === 4} // Check if rating is 4
              />
              <label htmlFor="rate-4" title="Very good">4 stars</label>

              <input
                type="radio"
                id="rate-5"
                value={5}
                {...register('rating', { required: true, valueAsNumber: true })}
                checked={defaultRating === 5} // Check if rating is 5
              />
              <label htmlFor="rate-5" title="Amazing">5 stars</label>
            </div>
            {errors.rating && <div className="error-message">Rating is required</div>}
          </div>

          <div className="form-group review-body-input">
            <label htmlFor="body">Review:</label>
            <textarea
              id="body"
              defaultValue={body} // Set the default value here
              {...register('body', { required: 'Review is required', minLength: { value: 1, message: 'Review cannot be empty' } })}
            />
            {errors.body && <div className="error-message">{errors.body.message}</div>}

          </div>

          <div className="review-btn-container">
            <button className='review-btn' type="submit">
              {isLoading ? 'Loading...' : 'Submit Review'}
            </button>

          </div>
        </form>
      </div>



    </>
  );
};

export default EditReviewForm;