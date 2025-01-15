import LikedMovieContent from "./LikedMovieContent";
import CircleAnimation from "../../../components/UI/LoadAnimation/CircleAnimation";
import { useGetMovieByIdQuery } from "../../movie-api/omdbApiSlice";
import ItemError from "../../../components/UI/errors/ItemError";
import { Box, Skeleton, Stack } from "@mui/material";
import MovieSkeletonLoader from "../../../components/UI/LoadAnimation/MovieSkeletonLoader";

interface LikedMovieItemProps {
  imdbId: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentImdbId: React.Dispatch<React.SetStateAction<string>>;
}

export default function LikedMovieItem({
  setIsModalOpen,
  setCurrentImdbId,
  imdbId,
}: LikedMovieItemProps): React.JSX.Element | null {

  // Hook call is always executed
  let {
    data: movieItem,
    isLoading,
    isError,
    error,
  } = useGetMovieByIdQuery(imdbId);
  let content;

  if (isLoading) {
    content =  <MovieSkeletonLoader />;

  } else if (isError || !movieItem) {
    content = (
      //@ts-ignore
      <ItemError
      faceSize={70}
        text={`Error: ${
          (error as any)?.data?.message || "Failed to load content."
        }`}
      />
    );
  }

  // Ensure movieItem is defined before accessing its properties
  else {
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
  } 

  // Return null if no conditions match
  return (
    
      <div className="movie-item">{content}</div>
    
  );
}
