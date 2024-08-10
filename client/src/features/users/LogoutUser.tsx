import { useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../auth/authApiSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify';

export default function LogoutUser({ closeNavbar, navDelay }) {

    const navigate = useNavigate();

    const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

    const handleLogoutBtnClick = () => {
        closeNavbar()
        setTimeout(() => {
            sendLogout()
        }, navDelay);
    }

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
            toast.success('Successfully logged out!');
        }
    }, [isSuccess, navigate]);

    if (isLoading) return <p>Logging Out...</p>;

    if (isError) return <p>Error: {error?.data?.message || 'Failed to logout'}</p>;

    return (
        <button
            className='logout-btn' onClick={handleLogoutBtnClick} disabled={isLoading}>{isLoading ? 'Logging out' : 'Logout'}
        </button>
    );
};
