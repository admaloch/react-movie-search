import { useUpdateUserMutation } from "../usersApiSlice";
import ErrorIcon from "@mui/icons-material/Error";
import { toast } from "react-toastify";
import "./LikeIcons.css";
import useAuth from "../../../hooks/useAuth";
import HourglassLoadingIcon from "../../../components/UI/LoadAnimation/HourglassLoadingIcon.tsx/HourglassLoadingIcon";
import "tippy.js/dist/tippy.css";
import { LikedUserMovies } from "../../../models/UserItemProps";
import Heart from "../../../components/UI/like-icon/Heart";

interface LikeIconProps {
  likedMovies: LikedUserMovies[];
  title: string;
  imdbId: string;
  style?: string;
}

export default function LikeIcon({
  likedMovies,
  title,
  imdbId,
  style,
}: LikeIconProps) {
  const { id } = useAuth();

  if (!id) return null;

  const alreadyLiked = likedMovies.some((movie) => movie.imdbId === imdbId);

  const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();

  const updateLikedList = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const movieData = !alreadyLiked ? { imdbId, title, id } : { imdbId, id };
    try {
      await updateUser(movieData).unwrap();
    } catch (err) {
      console.error("Failed to update liked list: ", err);
    }
  };

  let content;

  if (isLoading) content = <HourglassLoadingIcon />;

  if (isError) {
    toast.dismiss();
        //@ts-ignore
    toast.error(`Error: ${error?.data?.message || "Failed to like item."}`);
    content = <ErrorIcon />;
  } else {
    content = <Heart style={style} isLiked={alreadyLiked} />;
  }


  return <div className="like-icon-container" onClick={updateLikedList}>{content}</div>;
}
