import Modal from "../../../components/UI/Modal";
import { useState } from "react";
import NewReviewForm from "../NewReviewForm";
import EditReviewForm from "../EditReviewForm";
import IconButton from "@mui/material/IconButton";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import MovieReviewProps from "../../../models/MovieReviewProps";

interface ReviewIconProps {
  reviewedMovie: MovieReviewProps | undefined;
  imdbId: string;
  title: string;
}

export default function ReviewIcon({
  reviewedMovie,
  imdbId,
  title,
}: ReviewIconProps): React.JSX.Element | null {
  if (!imdbId) return null;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeReviewModal = () => {
    setIsModalOpen(false);
    // document.body.classList.remove('no-scroll');
  };

  const openReviewModal = () => {
    setIsModalOpen(true);
    // document.body.classList.add('no-scroll');
  };

  const popoverText = !reviewedMovie
    ? "Review this movie"
    : "Edit your existing review.";

  const modalContent = !reviewedMovie ? (
    <NewReviewForm
      imdbId={imdbId}
      title={title}
      closeModal={closeReviewModal}
    />
  ) : (
    <EditReviewForm movie={reviewedMovie} closeModal={closeReviewModal} />
  );

  return (
    <>
      <IconButton
        className="custom-icon-button review-icon"
        onClick={openReviewModal}
        aria-label="open review modal"
      >
        <Tippy content={popoverText}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="var(--color3)"
            className="bi bi-chat-left-text-fill"
            viewBox="0 0 16 16"
          >
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z" />
          </svg>
        </Tippy>
      </IconButton>

      <Modal closeModal={closeReviewModal} open={isModalOpen}>
        {modalContent}
      </Modal>
    </>
  );
}
