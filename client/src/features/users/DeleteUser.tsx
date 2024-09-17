import { useEffect } from "react";
import { useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserInfoProps } from "./UserProfile/UserInfo";

function DeleteUser({ user }: UserInfoProps): React.JSX.Element | null {

    if (!user) return null

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
            toast.dismiss()
            toast.success('Successfully deleted account!');
            navigate('/users/register');
        }
        if (isError) {
            //@ts-ignore
            toast.error(`Error: ${error?.data?.message || 'Failed to delete user'}`);
        }
    }, [isSuccess, isError, error, navigate]);

    return <button onClick={deleteUserBtnHandler}>Delete User</button>
}

export default DeleteUser