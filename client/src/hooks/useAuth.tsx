import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'; // Note the named import

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    let isLoggedIn = false;
    let username = "";
    let isAdmin = false;

    if (token) {
        const decoded = jwtDecode(token);
        if (decoded && decoded.UserInfo) {
            ({ username, isAdmin } = decoded.UserInfo);
            isLoggedIn = true;
        }
    }

    return { username, isAdmin, isLoggedIn };
};

export default useAuth;