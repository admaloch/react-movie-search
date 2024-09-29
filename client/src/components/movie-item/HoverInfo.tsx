import ItemContent from "./ItemContent";
import CircleAnimation from "../UI/LoadAnimation/CircleAnimation";
import UpdateLikedList from "../../features/users/update-liked-list/UpdateLikedList";
import ItemError from "../UI/errors/ItemError";
import { OmdbItemWithRTK } from "../../models/RTKQueryProps";

const HoverInfo = ({
  item,
  isLoading,
  isError,
  error,
}: OmdbItemWithRTK): JSX.Element | null => {
  
  let content;

  if (isLoading) {
    content = <CircleAnimation />;
  } else if (isError || !item) {
    content = (
      <ItemError
          // @ts-ignore
        text={`Error: ${error?.data?.message || "Failed to load content."}`}
      />
    );
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
