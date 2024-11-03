import { useEffect } from "react";
import { useDeleteUserMutation } from "./usersApiSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoCard from "../../components/UI/card/InfoCard";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useSendLogoutMutation } from "../auth/authApiSlice";

function DeleteUser(): React.JSX.Element | null {
  const { id, username } = useAuth();

  if (!id || !username) return null;

  const navigate = useNavigate();

  const [deleteUser, { isSuccess, isError, error }] = useDeleteUserMutation();
  const [sendLogout, {isError: isLogoutError, error: logoutError}] = useSendLogoutMutation();

  const deleteUserBtnHandler = async () => {
    try {
      
      await deleteUser(id).unwrap();
      await sendLogout();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };



  useEffect(() => {
    if (isSuccess) {
      toast.dismiss();
      toast.success("Successfully deleted account!");
      navigate("/users/register");
    }
    if (isError) {
      //@ts-ignore
      toast.error(
        `Error: ${(error as any)?.data?.message || "Failed to delete user"}`
      );
    }
  }, [isSuccess, isError, error, navigate]);

  useEffect(() => {

    if (isLogoutError) {
      //@ts-ignore
      toast.error(
        `Error: ${(logoutError as any)?.data?.message || "Failed to delete user"}`
      );
    }
  }, [isLogoutError, logoutError]);

  return (
    <main className="main-item-content">
      <InfoCard classes="delete-account">
        <h2>Delete Account Settings:</h2>
        <p>
          Deleting your account cannot be undone and you will lose any lists
          you've created or reviews you've completed
        </p>
        <p>Are you sure you want to follow through with this?</p>
        <div className="button-container">
          <button aria-label="submit delete account" className="delete-btn" onClick={deleteUserBtnHandler}>
            <SentimentVeryDissatisfiedIcon
              sx={{ fontSize: 20, fill: "white", marginRight: ".4rem" }}
            />
            I, {username}, want to delete my account
            <SentimentVeryDissatisfiedIcon
              sx={{ fontSize: 20, fill: "white", marginLeft: ".4rem" }}
            />
          </button>
        </div>
        <NavLink className="link-class" to={`/profiles/${id}/edit`}>
          <ArrowBackIcon />
          Edit account settings
        </NavLink>{" "}
        <NavLink className="link-class" to={`/profiles/${id}`}>
          <ArrowBackIcon />
          Return to profile
        </NavLink>{" "}
      </InfoCard>
    </main>
  );
}

export default DeleteUser;
