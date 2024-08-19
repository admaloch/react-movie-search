import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAddNewReviewMutation } from './reviewsApiSlice';
import useAuth from '../../hooks/useAuth';
import './Reviews.css'
import CloseIcon from '@mui/icons-material/Close';





const NewReviewForm = ({ imdbId, title, closeModal }) => {

    const { id } = useAuth()

    if (!id) return null

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [addNewReview, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewReviewMutation()


    const submitForm: SubmitHandler<IFormInput> = async (data) => {
        try {
            console.log({ ...data, imdbId, user: id, title })
            await addNewReview({ ...data, imdbId, user: id, title }).unwrap();
        } catch (err) {
            console.log('Error', err)
        }
    };


    useEffect(() => {
        if (isSuccess) {
            toast.success('Review successfully submitted');
            setTimeout(() => {
                closeModal()
            }, 2300);
        }
        if (isError) {
            toast.error(`Error: ${error?.data?.message || 'Failed to create review. Try again later.'}`);
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
                            />
                            <label htmlFor="rate-1" title="Terrible">1 star</label>
                            <input
                                type="radio"
                                id="rate-2"
                                value={2}
                                {...register('rating', { required: true, valueAsNumber: true })}
                            />
                            <label htmlFor="rate-2" title="Not good">2 stars</label>
                            <input
checked
                                type="radio"
                                id="rate-3"
                                value={3}
                                {...register('rating', { required: true, valueAsNumber: true })}
                            />
                            <label htmlFor="rate-3" title="Average">3 stars</label>
                            <input
                                
                                type="radio"
                                id="rate-4"
                                value={4}
                                {...register('rating', { required: true, valueAsNumber: true })}
                            />
                            <label htmlFor="rate-4" title="Very good">4 stars</label>
                            <input
                                type="radio"
                                id="rate-5"
                                value={5}
                                {...register('rating', { required: true, valueAsNumber: true })}
                            />
                            <label htmlFor="rate-5" title="Amazing">5 stars</label>
                        </div>
                        {errors.rating && <div className="error-message">Rating is required</div>}
                    </div>

                    <div className="form-group review-body-input">
                        <label htmlFor="body">Review:</label>
                        <textarea id="body" {...register('body', { required: 'Review is required', minLength: { value: 1, message: 'Review cannot be empty' } })} />
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

export default NewReviewForm;