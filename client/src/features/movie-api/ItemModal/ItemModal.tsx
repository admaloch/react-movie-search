import React, { useCallback } from "react";
import ModalContent from "./ModalContent";
import ItemError from "../../../components/UI/errors/ItemError";
import CloseIcon from "@mui/icons-material/Close";
import { OmdbItemWithRTK } from "../../../models/RTKQueryProps";
import "./ItemModal.css";
import MovieModalSkeletonLoader from "../../../components/UI/LoadAnimation/MovieModalSkeletonLoader";
import PosterImage from "../../../components/PosterImage/PosterImage";

interface ItemModalInterface extends OmdbItemWithRTK {
  closeModal: () => void;
}

const ItemModal = ({
  item,
  isLoading,
  isError,
  closeModal,
  error,
}: ItemModalInterface): React.JSX.Element | null => {

  const closeModalHandler = useCallback(() => {
    closeModal();
    document.body.classList.remove("no-scroll");
  }, [closeModal]);

  let content;

  if (isLoading) content = <MovieModalSkeletonLoader />;
  else if (isError && !item) {
    // @ts-ignore
    content = (
      <ItemError
        faceSize={80}
        text={`Error! ${
          (error as any)?.data?.message ||
          "We had trouble getting access to this item. Try refreshing your browser."
        }`}
      />
    );
  } else if (!item) {
    return null;
  } else {
    content = (
      <section
        className="modal-content-container"
        role="dialog"
        aria-labelledby={`${item.Title} info`}
      >
        <button
          onClick={closeModalHandler}
          className="modal-close-icon"
          ref={(button) => button}
        >
          <CloseIcon fontSize="large" />
        </button>
        <article className="modal-img-container">
          <PosterImage
            poster={item.Poster}
            imdbId={item.imdbID}
            height={400}
            width={275}
          />
        </article>
        <ModalContent item={item} />
      </section>
    );
  }

  return content;
};

export default ItemModal;
