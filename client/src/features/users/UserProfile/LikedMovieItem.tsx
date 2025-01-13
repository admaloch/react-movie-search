import { useSearchType } from "../../../hooks/useSearchType";
import LikedMovieContent from "./LikedMovieContent";
import CircleAnimation from "../../../components/UI/LoadAnimation/CircleAnimation";
import { useGetMovieByIdQuery } from "../../movie-api/omdbApiSlice";
import ItemError from "../../../components/UI/errors/ItemError";

interface LikedMovieItemProps {
  imdbId: string;
  hasWatched: boolean;
  isWatchedFilter: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentImdbId: React.Dispatch<React.SetStateAction<string>>;
}

export default function LikedMovieItem({
  setIsModalOpen,
  setCurrentImdbId,
  imdbId,
  hasWatched,
  isWatchedFilter,
}: LikedMovieItemProps): React.JSX.Element | null {
  const { currType } = useSearchType();
  const mainTypeFilter = currType.type;

  // Hook call is always executed
  let {
    data: movieItem,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetMovieByIdQuery(imdbId);
  let content;

  if (isLoading) {
    content = <CircleAnimation bgColor="#3838380a"/>;
  } else if (isError) {
    content = (
      //@ts-ignore
      <ItemError
        text={`Error: ${
          (error as any)?.data?.message || "Failed to load content."
        }`}
      />
    );
  }

  // Ensure movieItem is defined before accessing its properties
  else if (isSuccess && movieItem) {
    const itemTypeFilter = movieItem.Type;

    // Check the filter logic to return null if conditions are not met
    if (
      (hasWatched && isWatchedFilter === "notWatched") ||
      (!hasWatched && isWatchedFilter === "watched") ||
      (mainTypeFilter === "Movie" && itemTypeFilter !== "movie") ||
      (mainTypeFilter === "TV" && itemTypeFilter !== "series")
    ) {
      return null;
    }

    content = (
      <LikedMovieContent
        key={imdbId}
        apiItem={movieItem}
        imdbID={imdbId}
        isLoading={isLoading}
        setIsModalOpen={setIsModalOpen}
        setCurrentImdbId={setCurrentImdbId}
      />
    );
  } else {
    <ItemError
      text={"Something went wrong. Try refreshing your browser and try again."}
    />;
  }

  // Return null if no conditions match
  return (
    <div className="movie-item-container">
      <div className="movie-item">{content}</div>
    </div>
  );
}
