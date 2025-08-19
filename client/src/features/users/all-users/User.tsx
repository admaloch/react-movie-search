import { useGetUsersQuery } from "../usersApiSlice";
import UserPageLinkIcon from "./UserPageLinkIcon";
import { memo } from "react";
import { UserItemProps } from "../../../models/UserItemProps";
import UserListItems from "./UserListItems";
import UserSkeletonLoader from "../../../components/UI/LoadAnimation/UserSkeletonLoader";
import ItemError from "../../../components/UI/errors/ItemError";

interface UserProps {
  userId: string;
  isLoading: boolean;
  isError: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentImdbId: React.Dispatch<React.SetStateAction<string>>;
}

const User = ({
  userId,
  isLoading,
  isError,
  setIsModalOpen,
  setCurrentImdbId,
}: UserProps) => {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const typedUser = user as UserItemProps;

  if (!typedUser || !typedUser.likedMovies.length) return null;

  let reversedLikedMovies = typedUser.likedMovies.slice().reverse();

  let content = null;

  if (isLoading) content = <UserSkeletonLoader />;
  else if (isError)
    content = (
      <div className="user-item">
        <ItemError
          faceSize={70}
          text="Error! There was an issue locating this item. Try refreshing your browser."
        />
      </div>
    );
  else {
    content = (
      <div className="user-item">
        <h2>{typedUser.username}</h2>
        <ul className="liked-list">
          {reversedLikedMovies.map((movie) => (
            <UserListItems
              key={movie._id}
              title={movie.title}
              imdbId={movie.imdbId}
              setIsModalOpen={setIsModalOpen}
              setCurrentImdbId={setCurrentImdbId}
            />
          ))}
        </ul>
        <UserPageLinkIcon userId={typedUser._id} />
      </div>
    );
  }

  return <article className="user-container">{content}</article>;
};

const memoizedUser = memo(User);

export default memoizedUser;
