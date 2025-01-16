import { UserItemProps } from "../../../models/UserItemProps";

export interface UserInfoProps {
  user: UserItemProps;
}

export default function UserInfo({
  user,
}: UserInfoProps): React.JSX.Element | null {
  if (!user) return null;

  return (
    <>
      <h1>{user.username}'s Profile</h1>
      <h2>Info:</h2>
      {user.isAdmin && <p>Admin user</p>}
      <p>Contact: {user.email}</p>
      <h2>Liked Content:</h2>
    </>
  );
}
