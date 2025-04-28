import HoverInfo from "../../../components/movie-item/HoverInfo";
import PosterImage from "../../../components/PosterImage/PosterImage";
import { OmdbItem } from "../../../models/ItemApiProps";

interface LikedMovieContentProps {
  apiItem: OmdbItem;
  imdbID: string;
  isLoading: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentImdbId: React.Dispatch<React.SetStateAction<string>>;
}

export default function LikedMovieContent({
  apiItem,
  imdbID,
  isLoading,
  setIsModalOpen,
  setCurrentImdbId,
}: LikedMovieContentProps): React.JSX.Element | null {
  if (!apiItem) return null;

  return (
    <>
      <PosterImage poster={apiItem.Poster } imdbId={imdbID} height={300} width={300} />     
      <HoverInfo
        item={apiItem}
        isLoading={isLoading}
        setIsModalOpen={setIsModalOpen}
        setCurrentImdbId={setCurrentImdbId}
      />
    </>
  );
}
