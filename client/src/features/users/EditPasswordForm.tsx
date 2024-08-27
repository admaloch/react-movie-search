import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './users.css';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAddNewUserMutation, useUpdateUserMutation } from "./usersApiSlice"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useAuth from '../../hooks/useAuth';

interface IFormInput {
    email: string;
    username: string;
    password: string;
}

const EditPasswordForm: React.FC = ({ user }) => {

    const { id } = useAuth()
    if (!id) return null


    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {

        try {

            await updateUser({ ...data, id }).unwrap();

        } catch (err) {
            console.log('Error', err)
        }
    };


    useEffect(() => {
        if (isSuccess) {
            toast.success('Password successfully updated!');
            setTimeout(() => {
                navigate('/myprofile');
            }, 2300);
        }
        if (isError) {
            toast.error(`Error: ${error?.data?.message || 'Failed to update password. Try again later.'}`);
        }
    }, [isSuccess, isError, error, navigate]);

    // Watch the new password field to compare it with the confirmation
    const newPassword = watch('newPassword', '');

    const toggleOldPasswordVisibility = () => {
        setShowOldPassword((prev) => !prev);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="credentials-form">
                <h2>Edit password</h2>
                <div className="formGroup">
                    <label htmlFor="oldPassword" className="label">Old Password:</label>
                    <div className="passwordInputWrapper">
                        <input
                            type={showOldPassword ? 'text' : 'password'}
                            id="oldPassword"
                            {...register('oldPassword', {
                                required: 'Old password is required',
                            })}
                            name="oldPassword"
                            className="input"
                        />
                        <IconButton
                            onClick={toggleOldPasswordVisibility}
                            aria-label="toggle old password visibility"
                        >
                            {showOldPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </div>
                    {errors.oldPassword && <span className="error">{errors.oldPassword.message}</span>}
                </div>

                <div className="formGroup">
                    <label htmlFor="newPassword" className="label">New Password:</label>
                    <div className="passwordInputWrapper">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            id="newPassword"
                            {...register('newPassword', {
                                required: 'New password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters long',
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
                                },
                            })}
                            name="newPassword"
                            className="input"
                        />
                        <IconButton
                            onClick={toggleNewPasswordVisibility}
                            aria-label="toggle new password visibility"
                        >
                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </div>
                    {errors.newPassword && <span className="error">{errors.newPassword.message}</span>}
                </div>

                <div className="formGroup">
                    <label htmlFor="confirmPassword" className="label">Confirm New Password:</label>
                    <div className="passwordInputWrapper">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            {...register('confirmPassword', {
                                required: 'Please confirm your new password',
                                validate: (value) =>
                                    value === newPassword || 'Passwords do not match',
                            })}
                            name="confirmPassword"
                            className="input"
                        />
                        <IconButton
                            onClick={toggleConfirmPasswordVisibility}
                            aria-label="toggle confirm password visibility"
                        >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </div>
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
                </div>
                <button type="submit" disabled={isLoading} className="button">
                    {isLoading ? 'Updating...' : 'Update'}
                </button>
                <div className="edit-message">
                    <NavLink className="link-class" to={`/profiles/${user._id}/edit`}>
                        Edit user details
                    </NavLink>
                    <NavLink className="link-class" to={`/profiles/${user._id}`}>
                        <ArrowBackIcon />
                        Return to profile
                    </NavLink>
                </div>



            </form>


        </>
    );
};

export default EditPasswordForm;