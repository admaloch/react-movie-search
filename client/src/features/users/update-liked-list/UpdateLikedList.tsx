import useAuth from "../../../hooks/useAuth";
import { useGetUserByIdQuery } from "../usersApiSlice";
import LikeIcon from "./LikeIcon";
import HourglassLoadingIcon from "../../../components/UI/LoadAnimation/HourglassLoadingIcon.tsx/HourglassLoadingIcon";
import "tippy.js/dist/tippy.css";
import { UserItemProps } from "../../../models/UserItemProps";

interface UpdateLikedListProps {
  title: string;
  style?: any;
  imdbId: string;
}

export default function UpdateLikedList({
  imdbId,
  title,
  style
}: UpdateLikedListProps): React.JSX.Element | null {
  const { id } = useAuth();

  if (!id || !imdbId) return null;

  const { data: user, isLoading, isSuccess } = useGetUserByIdQuery(id);

  let content;


  if (isLoading) {
    content = (
        <div className="waiting-icon">
          <HourglassLoadingIcon />
        </div>
    );
  } else if (isSuccess) {
    const typedUser = user as UserItemProps;
    const { likedMovies } = typedUser;
    content = (
      <LikeIcon
        likedMovies={likedMovies}
        imdbId={imdbId}
        title={title}
        style={style}
      />
    );
  } else return null;

  return content;
}
