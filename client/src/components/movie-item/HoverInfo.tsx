import ItemContent from "./ItemContent";
import CircleAnimation from "../UI/LoadAnimation/CircleAnimation";
import UpdateLikedList from "../../features/users/update-liked-list/UpdateLikedList";
import ItemError from "../UI/errors/ItemError";
import { OmdbItemWithRTK } from "../../models/RTKQueryProps";


const HoverInfo = ({
  item,
  isLoading,
  isError,
}: OmdbItemWithRTK): JSX.Element | null => {
    
  if (!item) return null;

  let content;

  if (isLoading) {
    content = <CircleAnimation />;
  } else if (isError) {
    content = <ItemError text={"Failed to load content"} />;
  } else {
    content = (
      <>
        <ItemContent item={item} />
        <div className="liked-btn">
          <UpdateLikedList title={item.Title} imdbId={item.imdbID} size={30} />
        </div>
      </>
    );
  }

  return <div className="info-container">{content}</div>;
};
export default HoverInfo;
