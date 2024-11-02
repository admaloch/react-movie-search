import React, { useCallback } from "react";
import ModalContent from "./ModalContent";
import CircleAnimation from "../../../components/UI/LoadAnimation/CircleAnimation";
import ItemError from "../../../components/UI/errors/ItemError";
import CloseIcon from "@mui/icons-material/Close";
import imageNotFound from "../../../assets/image_not_found.png";
import { OmdbItemWithRTK } from "../../../models/RTKQueryProps";
import "./ItemModal.css";

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

  if (isLoading) content = <CircleAnimation />;
  else if (isError || !item) {
    // @ts-ignore
    content = (
      <ItemError
        text={`Error: ${
          (error as any)?.data?.message || "Failed to load content."
        }`}
      />
    );
  } else {
    const image = item.Poster !== "N/A" ? item.Poster : imageNotFound;
    const imageAlt =
      item.Poster !== "N/A"
        ? `${item.Title}-poster`
        : "image not found placeholder";

    content = (
      <section className="modal-content-container" role="dialog" aria-labelledby={`${item.Title} info`} >
        <div onClick={closeModalHandler} className="modal-close-icon">
          <CloseIcon fontSize="large" />
        </div>
        <article className="modal-img-container">
          <img height={400} width={275} src={image} alt={imageAlt} />
        </article>
        <ModalContent item={item} />
      </section>
    );
  }

  return content;
};

export default ItemModal;
