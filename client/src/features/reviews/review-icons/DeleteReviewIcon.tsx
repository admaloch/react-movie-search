import { useDeleteReviewMutation } from "../reviewsApiSlice";
import useAuth from "../../../hooks/useAuth";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InfoIcon from "@mui/icons-material/Info";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import IconButton from "@mui/material/IconButton";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { toast } from "react-toastify";

interface DeleteReviewIconProps {
  reviewId: string;
}

export default function DeleteReviewIcon({
  reviewId,
}: DeleteReviewIconProps): React.JSX.Element | null {
  const { id } = useAuth();

  if (!id) return null;

  const [deleteReview, { isLoading, isError, isSuccess, error }] =
    useDeleteReviewMutation();

  const deleteReviewHandler = async () => {
    const id = reviewId;
    await deleteReview(id);
  };

  let content;

  if (isLoading) {
    content = (
      <div className="delete-review-btn">
        <HourglassTopIcon sx={{ fontSize: 27 }} />
      </div>
    );
  } else if (isError) {
    //@ts-ignore
    console.log(`Error: ${error?.data?.message || "Could not delete review"}`);
    content = (
      <div className="delete-review-btn">
        <InfoIcon sx={{ fontSize: 25 }} />;
      </div>
    );
  } else if (isSuccess) {
    toast.dismiss();
    toast.success("Review successfully deleted");
    content = null;
  } else {
    content = (
      <IconButton
        className="custom-icon-button delete-review-btn"
        onClick={deleteReviewHandler}
        aria-label="delete"
      >
        <Tippy content="Delete review">
          <DeleteForeverIcon sx={{ fontSize: 33, color: "var(--color1)" }} />
        </Tippy>
      </IconButton>
    );
  }
  return content;
}
