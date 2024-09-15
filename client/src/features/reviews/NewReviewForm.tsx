import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddNewReviewMutation } from './reviewsApiSlice';
import useAuth from '../../hooks/useAuth';
import './Reviews.css'
import CloseIcon from '@mui/icons-material/Close';
import StarRating from '../../components/UI/StarRating';
import { IFormInput } from './EditReviewForm';

interface NewReviewFormProps {
    imdbId: string;
    title: string;
    closeModal: () => void;
}
const NewReviewForm = ({ imdbId, title, closeModal }: NewReviewFormProps) => {

    const [starRating, setStarRating] = useState(3);

    const { id } = useAuth()

    // if (!id || !imdbId) return null

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const [addNewReview, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewReviewMutation()

    const submitForm: SubmitHandler<IFormInput> = async (data) => {
        try {
            // console.log({ ...data, imdbId, user: id, title })
            await addNewReview({ ...data, imdbId, user: id, title, rating: starRating }).unwrap();
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
            //@ts-ignore
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
                        <StarRating
                            starRating={starRating}
                            setStarRating={setStarRating}
                        />
                        <p>Rating: {starRating}</p>
                        {errors.rating && <div className="error-message">Rating is required</div>}
                    </div>

                    <div className="form-group review-body-input">
                        <label htmlFor="body">Review:</label>
                        <textarea id="body" {...register('body', { required: 'Review is required', minLength: { value: 1, message: 'Review cannot be empty' } })} />
                        {errors.body && <div className="error-message">{errors.body.message}</div>}
                    </div>
                    <div className="review-btn-container">
                        <button className='review-btn' type="submit">
                            {isLoading ? 'Submitting...' : 'Submit Review'}
                        </button>

                    </div>
                </form>
            </div>

        </>
    );
};

export default NewReviewForm;