import { useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../auth/authApiSlice";
import { toast } from "react-toastify";
interface LogoutUserProps {
  closeNavbar: () => void;
  navLinkStyle: { display: string };
}

export default function LogoutUser({ closeNavbar, navLinkStyle }: LogoutUserProps) {

  const navigate = useNavigate();

  const [sendLogout, { isLoading }] = useSendLogoutMutation();

  const handleLogoutBtnClick = () => {
    closeNavbar();
    toast.dismiss();
    try {
      sendLogout();
      toast.success("You have been logged out");

      navigate("/login");
    } catch (err) {
      console.log("Error", err);
      toast.error("Failed to logout");
    }
  };

  return (
    <button
    style={navLinkStyle}
      aria-label="submit logout"
      className="logout-btn"
      onClick={handleLogoutBtnClick}
      disabled={isLoading}
    >
      {isLoading ? "Logging out" : "Logout"}
    </button>
  );
}
