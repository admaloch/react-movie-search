import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./users.css";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useUpdateUserMutation } from "./usersApiSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useAuth from "../../hooks/useAuth";
import { useSendLogoutMutation } from "../auth/authApiSlice";

interface IFormInput {
  email: string;
  username: string;
  password: string;
}

const EditUserForm: React.FC = () => {
  const { username, email, id } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: email || "", // Prepopulate with email from useAuth
      username: username || "", // Prepopulate with username from useAuth
    },
  });

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [sendLogout, { isError: isLogoutError }] = useSendLogoutMutation();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await updateUser({ ...data, id }).unwrap();
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.dismiss();
      toast.success(
        "Account info successfully updated! Please login with your new credentials."
      );
      setTimeout(() => {
        sendLogout();
        navigate("/login");
      }, 1000);
    }
    if (isError) {
      //@ts-ignore
      toast.error(
        `Error: ${
          (error as any)?.data?.message ||
          "Failed to update account info. Try again later."
        }`
      );
    }
  }, [isSuccess, isError, error, navigate]);

  useEffect(() => {
    if (isLogoutError) {
      window.location.reload();
    }
  }, [isLogoutError]);

  return (
    <main className="user-profile-container">
      <form onSubmit={handleSubmit(onSubmit)} className="credentials-form">
        <h2>Edit account details</h2>
        <div className="formGroup">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email is invalid",
              },
            })}
            name="email"
            className="input"
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <div className="formGroup">
          <label htmlFor="username" className="label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "Username is required" })}
            className="input"
            name="username"
          />
          {errors.username && (
            <span className="error">{errors.username.message}</span>
          )}
        </div>

        <button type="submit" disabled={isLoading} className="button">
          {isLoading ? "Updating..." : "Update"}
        </button>
        <div className="edit-message">
          <NavLink className="link-class" to={`/profiles/${id}/password`}>
            Edit password
          </NavLink>
          <NavLink className="link-class" to={`/profiles/${id}/delete`}>
           Delete account
          </NavLink>
          <NavLink className="link-class" to={`/profiles/${id}`}>
            <ArrowBackIcon />
            Return to profile
          </NavLink>
        </div>
      </form>
    </main>
  );
};

export default EditUserForm;
