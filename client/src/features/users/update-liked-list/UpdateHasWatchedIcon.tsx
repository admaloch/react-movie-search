import { useUpdateUserMutation } from "../usersApiSlice";
import ErrorIcon from "@mui/icons-material/Error";
import { toast } from "react-toastify";
import "./LikeIcons.css";
import useAuth from "../../../hooks/useAuth";
import HourglassLoadingIcon from "../../../components/UI/LoadAnimation/HourglassLoadingIcon.tsx/HourglassLoadingIcon";
import { IconButton } from "@mui/material";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { UpdateHasWatchedProps } from "./UpdateHasWatched";

export default function UpdateHasWatchedIcon({
  size,
  imdbId,
}: UpdateHasWatchedProps): React.JSX.Element | null {
  const { id } = useAuth();

  if (!id || !imdbId) return null;

  const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();

  const updateHasWatched = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const movieData = { imdbId, id, hasWatched: true };
    try {
      await updateUser(movieData).unwrap();
    } catch (err) {
      console.error("Failed to update liked list: ", err);
    }
  };

  let content;

  if (isLoading) content = <HourglassLoadingIcon />;

  if (isError) {
    //@ts-ignore
    toast.error(`Error: ${(error as any)?.data?.message}`);
    content = <ErrorIcon />;
  } else {
    content = (
      <div className="seen-icon" aria-hidden="false">
        <IconButton
          className="custom-icon-button eye-icon"
          onClick={updateHasWatched}
          aria-label="update has seen"
        >
          <Tippy content="I've seen this!">
            <svg
            tabIndex={-1}
              style={{ width: size }}
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-eye-fill"
              viewBox="0 0 16 16"
            >
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
            </svg>
          </Tippy>
        </IconButton>
      </div>
    );
  }

  return content;
}
