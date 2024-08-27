import { useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../auth/authApiSlice'
import { useEffect } from 'react'


export default function LogoutUser({ closeNavbar }) {

    const navigate = useNavigate();

    const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

    const handleLogoutBtnClick = () => {
        closeNavbar();
        if (!isLoading) {
            sendLogout();
            navigate('/login');
        }
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
