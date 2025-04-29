import SearchBtn from "./SearchBtn";
import ResultInfo from "./ResultInfo";
import UpdateLikedList from "../../users/update-liked-list/UpdateLikedList";
import HandleReviews from "../../reviews/HandleReviews";
import UpdateHasWatched from "../../users/update-liked-list/UpdateHasWatched";
import { OmdbItemInterface } from "../../../models/ItemApiProps";

export default function ModalContent({
  item,
}: OmdbItemInterface): React.JSX.Element | null {
  if (!item) return null;

  let year: string | number = new Date(item.Released).getFullYear();

  if(!year) {
    year = item.Year
  }

  const searchLink = `https://www.google.com/search?q=${item.Title}+${year}`;

  return (
    <main id="main-content" className="result-info-container">
      <ResultInfo item={item} year={year} />
      <div className="results-icons">
        <SearchBtn type={item.Type} searchLink={searchLink} />
        <UpdateLikedList
          title={item.Title}
          imdbId={item.imdbID}
          type={item.Type}
        />
        <UpdateHasWatched imdbId={item.imdbID} size={30} />
        <HandleReviews size={30} imdbId={item.imdbID} title={item.Title} />
      </div>
    </main>
  );
}
