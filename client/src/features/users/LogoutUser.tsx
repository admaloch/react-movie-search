import { useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../auth/authApiSlice'
import { useEffect } from 'react'

interface LogoutUserProps {
    closeNavbar: () => void;
}

export default function LogoutUser({ closeNavbar }: LogoutUserProps) {

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
            navigate('/login');
        }
        if (isError) {
            console.error('Logout failed:', error);
        }
    }, [isSuccess, isError, navigate, error]);

    return (
        <button
            className='logout-btn' onClick={handleLogoutBtnClick} disabled={isLoading}>{isLoading ? 'Logging out' : 'Logout'}
        </button>
    );
};
