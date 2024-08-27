import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'; // Note the named import

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    let isLoggedIn = false;
    let id = "";
    let isAdmin = false;
    let username = "";
    let email = "";

    if (token) {
        const decoded = jwtDecode(token);
        if (decoded && decoded.UserInfo) {
            ({ isAdmin, id, email, username } = decoded.UserInfo);
            isLoggedIn = true;
        }
    }

    return { id, isAdmin, isLoggedIn, email, username };
};

export default useAuth;
