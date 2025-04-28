import React, { useState } from "react";
import HoverInfo from "../../../components/movie-item/HoverInfo";
import { useLazyGetMovieByIdQuery } from "../omdbApiSlice";
import { OmdbItem, OmdbItemInterface } from "../../../models/ItemApiProps";
import MovieItemModal from "../ItemModal/MovieItemModal";
import PosterImage from "../../../components/PosterImage/PosterImage";
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

  const { imdbID, Poster } = item;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImdbId, setCurrentImdbId] = useState("");
  const [fetchedIds, setFetchedIds] = useState(new Set());

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImdbId("");
  };

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
      <PosterImage poster={Poster} imdbId={imdbID} height={275} width={225} />
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
