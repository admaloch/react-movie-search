import { OmdbItem } from "../../models/ItemApiProps";

interface ItemInfoProps {
  closeBioOverlay: () => void;
  item: OmdbItem;
}

export default function ItemInfo({
  item,
  closeBioOverlay,
}: ItemInfoProps): JSX.Element | null {
  if (!item) return null;

  // not all items have same ratings or any at all
  //preference... 1 rotten, 2 imbd, 3 metacritic, 4 null

  const rottenScore = item.Ratings.filter(
    (x) => x.Source === "Rotten Tomatoes",
  );
  const imdbScore = item.Ratings.filter(
    (x) => x.Source === "Internet Movie Database",
  );
  const metaScore = item.Ratings.filter((x) => x.Source === "Metacritic");
  let itemRating = null;
  if (rottenScore.length > 0) {
    itemRating = (
      <p>
        <span className="bold-item">Rotten Tomatoes Score:</span>{" "}
        {rottenScore[0].Value}
      </p>
    );
  } else if (imdbScore.length > 0) {
    itemRating = (
      <p>
        <span className="bold-item">IMDB Score:</span> {imdbScore[0].Value}
      </p>
    );
  } else if (metaScore.length > 0) {
    itemRating = (
      <p>
        <span className="bold-item">Metacritic Score:</span>{" "}
        {metaScore[0].Value}
      </p>
    );
  }

  let itemType;
  if (item.Type && item.Type !== "N/A") {
    itemType = item.Type.charAt(0).toUpperCase() + item.Type.slice(1);
  } else {
    itemType = null;
  }

  return (
    <div
      className="item-info"
      onMouseEnter={closeBioOverlay}
      onTouchEnd={closeBioOverlay}
    >
      {item.Title !== "N/A" && <h3>{item.Title}</h3>}
      {item.Director !== "N/A" && (
        <p>
          <span className="bold-item">Directed by:</span> {item.Director}
        </p>
      )}
      {item.Year !== "N/A" && (
        <p>
          <span className="bold-item">Released:</span> {item.Year}
        </p>
      )}
      {item.Rated !== "N/A" && (
        <p>
          <span className="bold-item">Rated:</span> {item.Rated}
        </p>
      )}
      {itemType && (
        <p>
          <span className="bold-item">Type:</span> {itemType}{" "}
        </p>
      )}
      {itemRating && itemRating}
    </div>
  );
}
