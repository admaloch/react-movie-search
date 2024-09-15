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

const EditUserForm: React.FC = () => {

    const { username, email, id } = useAuth()

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
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
            toast.success('Account info successfully updated!');
            setTimeout(() => {
                navigate(`/profiles/}`);
            }, 2300);
        }
        if (isError) {
            toast.error(`Error: ${error?.data?.message || 'Failed to update account info. Try again later.'}`);
        }
    }, [isSuccess, isError, error, navigate]);

    return (
        <main className='user-profile-container'>
            <form onSubmit={handleSubmit(onSubmit)} className="credentials-form">
                <h2>Edit account details</h2>
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
                        value={email}
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
                        value={username}
                    />
                    {errors.username && <span className="error">{errors.username.message}</span>}
                </div>

                <button type="submit" disabled={isLoading} className="button">
                    {isLoading ? 'Updating...' : 'Update'}
                </button>
                <div className="edit-message">
                    <NavLink className="link-class" to={`/profiles/${id}/password`}>
                        Edit password
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