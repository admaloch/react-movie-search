import { useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

export default function SettingsPage() {
  const { id: urlUserId } = useParams();
  const { id: currUserId } = useAuth();
  const isCurrUser = urlUserId === currUserId;
  if (!isCurrUser) return null;

  return (
    <div className="movie-items-container">
      <p>Edit account info</p>
    </div>
  );
}
