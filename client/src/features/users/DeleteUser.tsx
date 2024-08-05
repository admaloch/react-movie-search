import { useEffect } from "react";
import { useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeleteUser({ user }) {
    const navigate = useNavigate();

    const [deleteUser, {
        isSuccess,
        isError,
        error
    }] = useDeleteUserMutation()

    const deleteUserBtnHandler = async () => {
        try {
            await deleteUser(user.id).unwrap();
        } catch (err) {
            console.error('Failed to delete user:', err);
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('Successfully deleted account!');
            navigate('/users/register');
        }
        if (isError) {
            toast.error(`Error: ${error?.data?.message || 'Failed to delete user'}`);
        }
    }, [isSuccess, isError, error, navigate]);

    return <button onClick={deleteUserBtnHandler}>Delete User</button>

}

export default DeleteUser