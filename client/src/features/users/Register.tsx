import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './users.css';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAddNewUserMutation } from "./usersApiSlice"

interface IFormInput {
    email: string;
    username: string;
    password: string;
}

const Register: React.FC = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

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
                navigate('/myprofile');
            }, 2300);
        }
        if (isError) {
            toast.error(`Error: ${error?.data?.message || 'Failed to register new account. Try again later.'}`);
        }
    }, [isSuccess, isError, error, navigate]);

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
                <p>Already have an account?</p>
                <p>Click <NavLink className="link-class" to="/login">here</NavLink> to login</p>
            </form>


        </>
    );
};

export default Register;