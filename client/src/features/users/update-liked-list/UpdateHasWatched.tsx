import useAuth from "../../../hooks/useAuth";
import { useGetUserByIdQuery } from "../usersApiSlice";
import ErrorIcon from "@mui/icons-material/Error";
import HourglassLoadingIcon from "../../../components/UI/LoadAnimation/HourglassLoadingIcon.tsx/HourglassLoadingIcon";
import { red } from "@mui/material/colors";
import UpdateHasWatchedIcon from "./UpdateHasWatchedIcon";
import { UserItemProps } from "../../../models/UserItemProps";

export interface UpdateHasWatchedProps {
  size: number;
  imdbId: string;
}

export default function UpdateHasWatched({
  imdbId,
  size = 30,
}: UpdateHasWatchedProps): React.JSX.Element | null {
  const { id } = useAuth();

  if (!id) return null;

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
    const likedMovie = likedMovies.find((movie) => movie.imdbId === imdbId);
    if (!likedMovie) return null;
    const alreadyWatched = likedMovie.hasWatched;
    if (alreadyWatched) return null;
    content = <UpdateHasWatchedIcon size={size} imdbId={imdbId} />;
  } else {
    content = (
 
        <div className="disable-icon">
          <ErrorIcon fontSize="medium" sx={{ color: red[500] }} />
        </div>
 
    );
  }

  return content;
}
