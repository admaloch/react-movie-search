import LikedMovieContent from "./LikedMovieContent";
import CircleAnimation from "../../../components/UI/LoadAnimation/CircleAnimation";
import { useGetMovieByIdQuery } from "../../movie-api/omdbApiSlice";
import ItemError from "../../../components/UI/errors/ItemError";

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
    
      <div className="movie-item">{content}</div>
    
  );
}
