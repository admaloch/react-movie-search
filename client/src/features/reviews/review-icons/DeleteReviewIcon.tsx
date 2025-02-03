import { useDeleteReviewMutation } from "../reviewsApiSlice";
import useAuth from "../../../hooks/useAuth";
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
    console.log(
      `Error: ${(error as any)?.data?.message || "Could not delete review"}`,
    );
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
        aria-label="delete review"
      >
        <Tippy content="Delete review">
          <svg
          tabIndex={-1}
            style={{ marginLeft: "7px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="var(--color2)"
            className="bi bi-trash-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
          </svg>
        </Tippy>
      </IconButton>
    );
  }
  return content;
}
