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

interface IFormInput {
    email: string;
    username: string;
    password: string;
}

const EditPasswordForm: React.FC = ({user}) => {

    const [showPassword, setShowPassword] = useState(false);
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
            await updateUser(data).unwrap();

        } catch (err) {
            console.log('Error', err)
        }
    };


    useEffect(() => {
        if (isSuccess) {
            toast.success('Account info successfully updated!');
            setTimeout(() => {
                navigate('/myprofile');
            }, 2300);
        }
        if (isError) {
            toast.error(`Error: ${error?.data?.message || 'Failed to update account info. Try again later.'}`);
        }
    }, [isSuccess, isError, error, navigate]);

    const password = watch('password', '');

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
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
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters long',
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
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
                    {errors.password && <span className="error">{errors.password.message}</span>}
                </div>
                <div className="formGroup">
                    <label htmlFor="password" className="label">Password:</label>
                    <div className="passwordInputWrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters long',
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
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
                    {errors.password && <span className="error">{errors.password.message}</span>}
                </div>

                <div className="formGroup">
                    <label htmlFor="confirmPassword" className="label">Confirm Password:</label>
                    <div className="passwordInputWrapper">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: (value) =>
                                    value === password || 'Passwords do not match',
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
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            
                <p> <NavLink className="link-class" to="/profiles/${id}/edit">Edit user details</NavLink></p>
            </form>


        </>
    );
};

export default EditPasswordForm;