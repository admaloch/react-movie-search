import { useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../auth/authApiSlice";
import { toast } from "react-toastify";
import { useToastOnMutationResult } from "../../hooks/useToastOnMutation";
interface LogoutUserProps {
  closeNavbar: () => void;
  navLinkStyle: { display: string };
}

export default function LogoutUser({
  closeNavbar,
  navLinkStyle,
}: LogoutUserProps) {
  const navigate = useNavigate();

  const [sendLogout, { isLoading, isSuccess, error, isError }] = useSendLogoutMutation();

  const handleLogoutBtnClick = () => {
    closeNavbar();
    toast.dismiss();
    try {
      sendLogout();
      navigate("/login");
    } catch (err) {
      console.log("Error", err);
    }
  };

  useToastOnMutationResult(isSuccess, isError, error, {
    successMessage: "Successfully logged out!",
    errorMessage: "Failed to log out. Check your connection and try again",
  });

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
