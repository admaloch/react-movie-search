import ItemContent from "./ItemContent";
import CircleAnimation from "../UI/LoadAnimation/CircleAnimation";
import UpdateLikedList from "../../features/users/update-liked-list/UpdateLikedList";
import ItemError from "../UI/errors/ItemError";
import { OmdbItemWithRTK } from "../../models/RTKQueryProps";


const HoverInfo = ({
  item,
  isLoading,
  isError,
  error
}: OmdbItemWithRTK): JSX.Element | null => {

  let size: number = 30
  if(window.innerWidth < 600) {
    size = 15
  } else {
    size = 30
  }
    

  let content;

   if (isLoading) {
    content = <CircleAnimation />;
  } 
   else if (isError ||  !item) {
    // @ts-ignore
    content = <ItemError text={`Error: ${error?.data?.message || 'Failed to load content.'}`}/>
  }
   else {
    content = (
      <>
        <ItemContent item={item} />
        <div className="liked-btn">
          <UpdateLikedList title={item.Title} imdbId={item.imdbID} size={size} />
        </div>
      </>
    );
  }

  return <div className="info-container">{content}</div>;
};
export default HoverInfo;
