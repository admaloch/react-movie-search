import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './auth.css';
import { NavLink } from 'react-router-dom';

interface IFormInput {
  email: string;
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('Login Form submitted:', data);
  };

  return (

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

      <button type="submit" className="button">Submit</button>
      <p>Haven't set up an account?</p>
      <p>Click <NavLink className="link-class" to="/register">here</NavLink> to register</p>

    </form>
    

  );
};

export default Login;
