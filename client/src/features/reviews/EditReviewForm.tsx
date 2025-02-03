import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUpdateReviewMutation } from "./reviewsApiSlice";
import "./Reviews.css";
import CloseIcon from "@mui/icons-material/Close";
import StarRating from "../../components/UI/StarRating";
import MovieReviewProps from "../../models/MovieReviewProps";

export interface IFormInput {
  body: string;
  rating: number;
}

interface EditReviewFormProps {
  closeModal: () => void;
  movie: MovieReviewProps;
}

const EditReviewForm = ({ closeModal, movie }: EditReviewFormProps) => {
  if (!movie) return null;

  const { body, title, _id, rating } = movie;

  const [starRating, setStarRating] = useState<number>(parseInt(rating));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [updateReview, { isLoading, isSuccess, isError, error }] =
    useUpdateReviewMutation();

  const submitForm: SubmitHandler<IFormInput> = async (data) => {
    try {
      await updateReview({ ...data, rating: starRating, id: _id }).unwrap();
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.dismiss();
      toast.success("Review successfully updated");
      setTimeout(() => {
        closeModal();
      }, 600);
    }
    if (isError) {
      toast.dismiss();
      //@ts-ignore
      toast.error(
        `Error: ${
          (error as any)?.data?.message ||
          "Failed to update review. Try again later."
        }`,
      );
    }
  }, [isSuccess, isError, error]);

  return (
    <>
      <div className="review-form">
        <button onClick={() => closeModal()} className="close-modal-icon">
          <CloseIcon fontSize="large" />
        </button>
        <form onSubmit={handleSubmit(submitForm)}>
          <h2>Review for {title}</h2>

          <div className="form-group review-star-input">
            <label htmlFor="rating">Star Rating:</label>
            <StarRating starRating={starRating} setStarRating={setStarRating} />
            <p>You rated: {starRating}</p>
            {errors.rating && (
              <div className="error-message">Rating is required</div>
            )}
          </div>

          <div className="form-group review-body-input">
            <label htmlFor="body">Review:</label>
            <textarea
              id="body"
              defaultValue={body} // Set the default value here
              {...register("body", {
                required: "Review is required",
                minLength: { value: 1, message: "Review cannot be empty" },
              })}
            />
            {errors.body && (
              <div className="error-message">{errors.body.message}</div>
            )}
          </div>
          <div className="review-btn-container">
            <button
              aria-label="submit review edit"
              className="review-btn"
              type="submit"
            >
              {isLoading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditReviewForm;
