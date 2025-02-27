import React, { useState } from "react";
import image_not_found from "../../../assets/image_not_found.png";
import UpdateLikedList from "../../users/update-liked-list/UpdateLikedList";
import { SmallOmdbItem } from "../../../models/ItemApiProps";
import MovieItemModal from "../ItemModal/MovieItemModal";

interface ExtendedOmdbItem extends SmallOmdbItem {
  isListShown: boolean;
}

const SearchListItem = ({
  imdbID,
  Poster,
  Title,
  Type,
  Year,
  isListShown,
}: ExtendedOmdbItem): React.JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const listItemClickHandler = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <li >
        <button tabIndex={isListShown ? 0 : -1} className="search-list-item" onClick={listItemClickHandler}>
          <div className="search-item-thumbnail">
            <img
              width={27}
              height={50}
              src={Poster !== "N/A" ? Poster : image_not_found}
            ></img>
          </div>
          <div className="search-item-info">
            <h3>{Title}</h3>
            {Year && <p>{Year}</p>}
          </div>
          <div style={{display: isListShown ? 'block' : 'none'}} className="like-icon-container">
            <UpdateLikedList title={Title} imdbId={imdbID} type={Type} />
          </div>
        </button>
      </li>
      <MovieItemModal
        imdbId={imdbID}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </>
  );
};
export default React.memo(SearchListItem);
