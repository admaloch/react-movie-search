import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './users.css';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAddNewUserMutation } from "./usersApiSlice"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

interface IFormInput {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

const Register: React.FC = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormInput>();

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        toast.dismiss()
        try {
            await addNewUser(data).unwrap();
            // toast.success('Registration successful!');
            // setTimeout(() => {
            //     navigate('/myprofile');
            // }, 2300);
        } catch (err) {
            console.log('Error', err)
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success('Registration successful!');
            setTimeout(() => {
                navigate('/login');
            }, 2300);
        }
        if (isError) {
            //@ts-ignore
            toast.error(`Error: ${error?.data?.message || 'Failed to register new account. Try again later.'}`);
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
                <h2>Create an Account</h2>
                <div className="formGroup">
                    <label htmlFor="email" className="label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Email is invalid'
                            }
                        })}
                        name="email"
                        className="input"
                    />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                </div>
                <div className="formGroup">
                    <label htmlFor="username" className="label">Username:</label>
                    <input
                        type="text"
                        id="username"
                        {...register('username', { required: 'Username is required' })}
                        className="input"
                        name="username"
                    />
                    {errors.username && <span className="error">{errors.username.message}</span>}
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
                <p>Already have an account?</p>
                <p>Click <NavLink className="link-class" to="/login">here</NavLink> to login</p>
            </form>

        </>
    );
};

export default Register;