import ItemContent from "./ItemContent";
import UpdateLikedList from "../../features/users/update-liked-list/UpdateLikedList";
import { OmdbItemWithRTK } from "../../models/RTKQueryProps";
import MovieSkeletonLoader from "../UI/LoadAnimation/MovieSkeletonLoader";
import ItemError from "../UI/errors/ItemError";

interface HoverInfoProps extends OmdbItemWithRTK {
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentImdbId?: React.Dispatch<React.SetStateAction<string>>;
}

const HoverInfo = ({
  setIsModalOpen,
  setCurrentImdbId,
  item,
  isLoading,
  error,
  isError,
}: HoverInfoProps): JSX.Element | null => {
  
  let content;

  if (isLoading) {
    content = <MovieSkeletonLoader />;
  } else if (isError || !item) {
    content =  <ItemError
            faceSize={60}
            text={`Error! ${
              (error as any)?.data?.message || "We had trouble getting access to this item. Try refreshing your browser."
            }`}
          />
  } else {
    content = (
      <>
        <ItemContent 
          item={item} 
          setIsModalOpen={setIsModalOpen}
          setCurrentImdbId={setCurrentImdbId}
        />
        <UpdateLikedList title={item.Title} type={item.Type} imdbId={item.imdbID} />
      </>
    );
  }

  return <div className="info-container">{content}</div>;
};
export default HoverInfo;
