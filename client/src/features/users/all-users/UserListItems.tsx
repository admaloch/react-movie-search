interface UserListItemsProps {
  imdbId: string;
  title: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentImdbId: React.Dispatch<React.SetStateAction<string>>;
}

export default function UserListItems({
  title,
  setIsModalOpen,
  imdbId,
  setCurrentImdbId,
}: UserListItemsProps): React.JSX.Element | null {
  const listItemClickHandler = () => {
    setIsModalOpen(true);
    setCurrentImdbId(imdbId);
  };

  return (
    <>
      <li onClick={listItemClickHandler}>
        <span className="user-movie-item">{title}</span>
      </li>
    </>
  );
}
