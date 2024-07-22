import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './Credentials.css';
import { NavLink } from 'react-router-dom';

interface IFormInput {
  email: string;
  username: string;
  password: string;
}

const Register: React.FC = ({type}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('Form submitted:', data);
  };

  let headerText = 

  return (

    <form action="/register" method="POST" onSubmit={handleSubmit(onSubmit)} className="credentials-form">
      <h2>{text}</h2>
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
          className="input"
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>

      <button type="submit" className="button">Submit</button>
      <p>Already have an account?</p>
      <p>Click <NavLink className="link-class" to="/login">here</NavLink> to login</p>

    </form>
    

  );
};

export default Register;
