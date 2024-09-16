import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'; 

interface AuthProps {
    UserInfo: {
        isAdmin: boolean;
        id: string;
        email: string;
        username: string;
    };
}

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    let isLoggedIn = false;
    let id = "";
    let isAdmin = false;
    let username = "";
    let email = "";

    if (token) {
        const decoded: AuthProps = jwtDecode(token);
        if (decoded && decoded.UserInfo) {
            ({ isAdmin, id, email, username } = decoded.UserInfo);
            isLoggedIn = true;
        }
    }
    return { id, isAdmin, isLoggedIn, email, username };
};

export default useAuth;
