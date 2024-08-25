import { useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../auth/authApiSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify';
import CircleAnimation from '../../components/UI/LoadAnimation/CircleAnimation';

export default function LogoutUser({ closeNavbar, navDelay }) {

    const navigate = useNavigate();

    const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

    const handleLogoutBtnClick = () => {
        closeNavbar();

        setTimeout(() => {
            if (!isLoading) {
                sendLogout();
                navigate('/login');
            }
        }, navDelay);
    };

    useEffect(() => {
        if (isSuccess) {

            navigate('/login'); // or wherever you want to redirect after logout
        }
        if (isError) {
            // Handle error (e.g., show a toast notification or error message)
            console.error('Logout failed:', error);
        }
    }, [isSuccess, isError, navigate, error]);

    return (
        <button
            className='logout-btn' onClick={handleLogoutBtnClick} disabled={isLoading}>{isLoading ? 'Logging out' : 'Logout'}
        </button>
    );
};
