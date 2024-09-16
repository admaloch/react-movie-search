import { useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../auth/authApiSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify';

interface LogoutUserProps {
    closeNavbar: () => void;
}

export default function LogoutUser({ closeNavbar }: LogoutUserProps) {

    const navigate = useNavigate();

    const [sendLogout, { isLoading }] = useSendLogoutMutation();

    const handleLogoutBtnClick = async () => {
        try {
            closeNavbar();

            await sendLogout().unwrap(); // Wait for the mutation to resolve

            // Assuming unwrap() gives the resolved result and handles rejections, but you can use just await if it's unnecessary.
            toast.success('You have successfully logged out!');

            setTimeout(() => {
                navigate('/login');
            }, 2300);
        } catch (err) {
            // Log or check the error if necessary
            toast.error('There was an issue logging out. Try again.');
        }
    };




    return (
        <button
            className='logout-btn' onClick={handleLogoutBtnClick} disabled={isLoading}>{isLoading ? 'Logging out' : 'Logout'}
        </button>
    );
};
