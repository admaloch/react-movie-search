import { useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../auth/authApiSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify';

export default function LogoutUser({ closeNavbar, navDelay }) {

    const navigate = useNavigate();

    const [sendLogout, { isLoading, isError, error }] = useSendLogoutMutation();


    const handleLogoutBtnClick = () => {
        closeNavbar()
        setTimeout(() => {
            sendLogout()
            navigate('/login');
            toast.success('Successfully logged out!');
        }, navDelay);
    }

    if (isLoading) return <p>Logging Out...</p>;

    if (isError) return <p>Error: {error?.data?.message || 'Failed to logout'}</p>;

    return (
        <button
            className='logout-btn' onClick={handleLogoutBtnClick} disabled={isLoading}>{isLoading ? 'Logging out' : 'Logout'}
        </button>
    );
};
