import { useGetUsersQuery } from "../usersApiSlice";
import "./User.css";
import User from "./User";
import { useState } from "react";
import MovieItemModal from "../../movie-api/ItemModal/MovieItemModal";
import CircleAnimation from "../../../components/UI/LoadAnimation/CircleAnimation";
import Error from "../../../components/UI/errors/Error";

export default function ListAllUsers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImdbId, setCurrentImdbId] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImdbId("");
  };

  const {
    data: users,
    isLoading,
    isError,
  } = useGetUsersQuery("usersList", {
    refetchOnFocus: true, // or set to false if you don't need it
    refetchOnMountOrArgChange: false, // avoid refetching on every mount
  });

  let content = null;

  if (isLoading) {
    content = <CircleAnimation />;
  }
  if (isError || !users) {
    content = <Error text="We are unable to load that content right now!" />;
  } else {
    const usersIds = users.ids as string[];
    content = (
      <>
        <h1>All Users:</h1>
        <div className="user-list">
          {usersIds.map((id) => (
            <User
              key={id}
              userId={id}
              isLoading={isLoading}
              isError={isError}
              setIsModalOpen={setIsModalOpen}
              setCurrentImdbId={setCurrentImdbId}
            />
          ))}
        </div>
        {isModalOpen && (
          <MovieItemModal
            imdbId={currentImdbId}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
          />
        )}
      </>
    );
  }

  return (
    <main id="main-content" className="main-item-content all-users-section">
      {content}
    </main>
  );
}
