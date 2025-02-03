import React, { useState } from "react";
import HoverInfo from "../../../components/movie-item/HoverInfo";
import image_not_found from "../../../assets/image_not_found.png";
import { useLazyGetMovieByIdQuery } from "../omdbApiSlice";
import { OmdbItem, OmdbItemInterface } from "../../../models/ItemApiProps";
import MovieItemModal from "../ItemModal/MovieItemModal";
interface SliderItemProps extends OmdbItemInterface {
  showArrowFunc: () => void;
  hideArrowFunc: () => void;
  item: OmdbItem;
}

const SliderItem = ({
  item,
  showArrowFunc,
  hideArrowFunc,
}: SliderItemProps): JSX.Element | null => {
  if (!item) return null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImdbId, setCurrentImdbId] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImdbId("");
  };

  const { imdbID, Poster } = item;
  const [fetchedIds, setFetchedIds] = useState(new Set());

  const [triggerGetMovieById, { data: movieItem, isLoading }] =
    useLazyGetMovieByIdQuery();

  function mouseEnterHandler() {
    hideArrowFunc();

    // Check if the imdbID has already been fetched
    if (!fetchedIds.has(imdbID)) {
      triggerGetMovieById(imdbID);
      setFetchedIds((prevIds) => new Set(prevIds).add(imdbID));
    }
  }

  return (
    <article
      onMouseEnter={mouseEnterHandler}
      onFocus={mouseEnterHandler}
      onMouseLeave={showArrowFunc}
      onBlur={showArrowFunc}
      className="movie-container"
      data-id={imdbID}
      tabIndex={0}
    >
      <img
      src={Poster !== "N/A" ? Poster : image_not_found}
      alt={imdbID}
      height={275}
      width={225}
      />
      <HoverInfo
      item={movieItem}
      isLoading={isLoading}
      setIsModalOpen={setIsModalOpen}
      setCurrentImdbId={setCurrentImdbId}
      />
      <MovieItemModal
      imdbId={currentImdbId}
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      />
    </article>
  );
};
export default React.memo(SliderItem);
