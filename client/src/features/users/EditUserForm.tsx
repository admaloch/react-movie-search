import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
// import './auth.css';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useUpdateUserMutation } from "./usersApiSlice"
import DeleteUser from './DeleteUser';

interface IFormInput {
    email: string;
    username: string;
    password: string;
}

const EditUserForm: React.FC = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()



    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            await updateUser(data).unwrap();
        } catch (err) {
            console.log('Error processing registration data', err)
            toast.error('Account registration failed. Try again later.');
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success('You successfully updated your information!');
            navigate('/myprofile');
        }
        if (isError) {
            toast.error(`Error: ${error}`);
        }
    }, [isSuccess, isError, error, navigate]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="credentials-form">
                <h2>Edit Account info:</h2>
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
                    <input
                        type="password"
                        id="password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters'
                            }
                        })}
                        name="password"
                        className="input"
                    />
                    {errors.password && <span className="error">{errors.password.message}</span>}
                </div>
                <button type="submit" disabled={isLoading} className="button">
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
                <DeleteUser user = {user}/>
            </form>
            <p>Already have an account?</p>
            <p>Click <NavLink className="link-class" to="/login">here</NavLink> to login</p>
            <ToastContainer
                position="top-center"
                autoClose={1200}
                closeOnClick={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" />
        </>
    );
};

export default EditUserForm;