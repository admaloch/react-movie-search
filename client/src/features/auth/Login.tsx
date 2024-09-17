import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './auth.css';
import { toast } from 'react-toastify';
import { useNavigate, NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist';
import CircleAnimation from '../../components/UI/LoadAnimation/CircleAnimation';

interface IFormInput {
    email: string;
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    const [persist, setPersist] = usePersist()

    const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
        toast.dismiss();
        try {
            // const { email, password } = data
            const { accessToken, id } = await login({ email, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            toast.success('Login successful!');
            setTimeout(() => {
                navigate(`/profiles/${id}`);
            }, 1000);
        } catch (err) {
            //@ts-ignore
            toast.error(`Error: ${err?.data?.message || 'Failed to load content.'}`);
        }
    };

    const handlePersistToggle = () => setPersist(prev => !prev)

    if (isLoading) return <CircleAnimation />

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="credentials-form">
                <h2>Login to your account</h2>
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
                    {isLoading ? 'Logging in...' : 'Submit'}
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
                <p>Click <NavLink className="link-class" to="/users/register">here</NavLink> to register</p>

            </form>

        </>

    );
};

export default Login;