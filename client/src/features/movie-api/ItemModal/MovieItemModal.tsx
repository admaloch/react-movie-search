import React, { useEffect } from "react";
import ItemModal from "./ItemModal";
import Modal from "../../../components/UI/Modal";
import { useLazyGetMovieByIdQuery } from "../omdbApiSlice";

interface MovieItemModalProps {
  imdbId: string | null;
  isModalOpen: boolean;
  closeModal: () => void;
}

export default function MovieItemModal({
  imdbId,
  isModalOpen,
  closeModal,
}: MovieItemModalProps): React.JSX.Element {
  const [triggerGetMovieById, { data: movieItem, isLoading, isError, error }] =
    useLazyGetMovieByIdQuery();

  const closeItemModal = () => {
    closeModal();
    document.body.classList.remove("no-scroll");
  };

  useEffect(() => {
    if (isModalOpen && imdbId) {
      const openModalAndFetchData = async () => {
        document.body.classList.add("no-scroll");
        await triggerGetMovieById(imdbId);
      };
      openModalAndFetchData();
    }
  }, [isModalOpen, imdbId]);

  useEffect(() => {
    if (isError) {
      closeItemModal();
    }
  }, [isError]);

  return (
    <Modal closeModal={closeItemModal} open={isModalOpen}>
      {imdbId ? (
        <ItemModal
          isError={isError}
          isLoading={isLoading}
          item={movieItem}
          closeModal={closeItemModal}
          error={error}
        />
      ) : null}
    </Modal>
  );
}
