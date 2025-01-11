import "./UserProfile.css";
import { useState } from "react";
import { useGetUserByIdQuery } from "../usersApiSlice";
import { useParams } from "react-router-dom";
import UserInfo from "./UserInfo";
import FilterContentOptions from "./FilterContentOptions";
import LikedMovieItems from "./LikedMovieItems";
import UserSettingsIcon from "./UserSettingsIcon";
import { UserItemProps } from "../../../models/UserItemProps";
import Error from "../../../components/UI/errors/Error";
import CircleAnimation from "../../../components/UI/LoadAnimation/CircleAnimation";

export default function UserProfile() {

  const [isWatched, setIsWatched] = useState("both");

  const { id } = useParams();

  let { data: user, isError, isLoading } = useGetUserByIdQuery(id);

  let content = null;


  if(isLoading) content = <CircleAnimation />

  else if (isError || !user) content = <Error text={'We were unable to locate that user. Check your internet connection and try again.'} />

  else {
    const typedUser = user as UserItemProps;
    const { likedMovies } = typedUser;

    content = (
      <>
        <UserInfo user={typedUser} />
        <FilterContentOptions
          isWatched={isWatched}
          setIsWatched={setIsWatched}
        />
        <LikedMovieItems
          isWatched={isWatched}
          likedMovies={likedMovies}
        />
        <UserSettingsIcon />
      </>
    );

  }

  

  return (
    <main className="user-profile-container">
      {content}
    </main>
  );
}
