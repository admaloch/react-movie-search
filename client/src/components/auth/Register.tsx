import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './auth.css';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';



interface IFormInput {
  email: string;
  username: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log('Register Form submitted:', data);
    try {
      const response = await axios.post('http://localhost:3500/register', data);
      console.log('Registration successful:', response.data);
      toast.success('Registration successful!');


      setTimeout(() => {
        navigate('/login');
      }, 2000)
    } catch (error) {

      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || 'There was a problem with the registration request.';
        toast.error(errorMessage);
        console.error('There was a problem with the registration request:', error);
      } else {
        toast.error('An unexpected error occurred.');
        console.error('An unexpected error occurred:', error);


      }


    }
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
        <p>Already have an account?</p>
        <p>Click <NavLink className="link-class" to="/login">here</NavLink> to login</p>

      </form>
      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
    </>


  );
};

export default Register;
