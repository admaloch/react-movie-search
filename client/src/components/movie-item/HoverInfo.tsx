import ItemContent from "./ItemContent";
import CircleAnimation from "../UI/LoadAnimation/CircleAnimation";
import UpdateLikedList from "../../features/users/update-liked-list/UpdateLikedList";
import { OmdbItemWithRTK } from "../../models/RTKQueryProps";

interface HoverInfoProps extends OmdbItemWithRTK {
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentImdbId?: React.Dispatch<React.SetStateAction<string>>;
}

const HoverInfo = ({
  setIsModalOpen,
  setCurrentImdbId,
  item,
  isLoading,
  isError,
}: HoverInfoProps): JSX.Element | null => {
  
  let content;

  if (isLoading) {
    content = <CircleAnimation />;
  } else if (isError || !item) {
    return null;
  } else {
    content = (
      <>
        <ItemContent 
          item={item} 
          setIsModalOpen={setIsModalOpen}
          setCurrentImdbId={setCurrentImdbId}
        />
        <UpdateLikedList title={item.Title} imdbId={item.imdbID} />
      </>
    );
  }

  return <div className="info-container">{content}</div>;
};
export default HoverInfo;
