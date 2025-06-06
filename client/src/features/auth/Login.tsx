import React, { useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./auth.css";
import { useNavigate, NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useToastOnMutationResult } from "../../hooks/useToastOnMutation";

interface IFormInput {
  email: string;
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  const [persist, setPersist] = usePersist();

  // Memoize the onSubmit function to prevent unnecessary re-renders
  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    async ({ email, password }) => {
      try {
        const { accessToken, id } = await login({ email, password }).unwrap();
        dispatch(setCredentials({ accessToken }));
        setTimeout(() => {
          navigate(`/profiles/${id}`);
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    },
    [login, navigate, dispatch, error]
  );

  useToastOnMutationResult(isSuccess, isError, error, {
    successMessage: "Login successful!",
    errorMessage: "Failed to login. Check your connection and try again"
  });

  // Memoize handlePersistToggle to prevent unnecessary re-renders
  const handlePersistToggle = useCallback(
    () => setPersist((prev) => !prev),
    [setPersist]
  );

  // Memoize togglePasswordVisibility to prevent unnecessary re-renders
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="credentials-form">
        <h2>Login to your account</h2>
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
          <label htmlFor="password" className="label">
            Password:
          </label>
          <div className="passwordInputWrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
              name="password"
              className="input"
            />
            <IconButton
              onClick={togglePasswordVisibility}
              aria-label="toggle password visibility"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>

        <button
          aria-label="submit login"
          type="submit"
          disabled={isLoading}
          className="button"
        >
          {isLoading ? "Logging in..." : "Submit"}
        </button>
        <label htmlFor="persist" className="form__persist">
          <input
            type="checkbox"
            className="form__checkbox"
            id="persist"
            onChange={handlePersistToggle}
            checked={persist}
          />
          Trust This Device
        </label>
        <p>Haven't set up an account?</p>
        <p>
          Click{" "}
          <NavLink className="link-class" to="/users/register">
            here
          </NavLink>{" "}
          to register
        </p>
      </form>
    </>
  );
};

export default Login;
