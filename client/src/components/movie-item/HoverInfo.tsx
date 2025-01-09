import ItemContent from "./ItemContent";
import CircleAnimation from "../UI/LoadAnimation/CircleAnimation";
import UpdateLikedList from "../../features/users/update-liked-list/UpdateLikedList";
import { OmdbItemWithRTK } from "../../models/RTKQueryProps";

const HoverInfo = ({
  item,
  isLoading,
  isError,
}: OmdbItemWithRTK): JSX.Element | null => {
  
  let content;

  if (isLoading) {
    content = <CircleAnimation />;
  } else if (isError || !item) {
    return null;
  } else {
    content = (
      <>
        <ItemContent item={item} />
        <UpdateLikedList title={item.Title} imdbId={item.imdbID} />
      </>
    );
  }

  return <div className="info-container">{content}</div>;
};
export default HoverInfo;
