import { useRef, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";


export default function MainNavContent() {
    const [cookies, setCookies] = useCookies(["access_token"]);

    const navRef = useRef();

    const [isNavigating, setIsNavigating] = useState(false);
    const navigate = useNavigate();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    const handleNavClick = (path) => {
        if (isNavigating) return;

        setIsNavigating(true);
        showNavbar();

        const delay = window.innerWidth > 1024 ? 0 : 800;

        setTimeout(() => {
            if (path !== 'logout') {
                navigate(path);
            } else {

                logout()
            }
            setIsNavigating(false);
        }, delay);
    };

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.clear();

        navigate("/login");
    };

    return (
        <>
            <nav ref={navRef}>
                <a onClick={() => handleNavClick('/')} href="#">Home</a>
                <a onClick={() => handleNavClick('/search')} href="#">Search</a>
                {cookies.access_token && (
                    <a onClick={() => handleNavClick('/myprofile')} href="#">MyProfile</a>
                )}
                {!cookies.access_token && (
                    <a onClick={() => handleNavClick('/register')} href="#">Register</a>
                )}
                {!cookies.access_token ? (
                    <a onClick={() => handleNavClick('/login')} href="#">Login</a>
                ) : (
                    <a onClick={() => handleNavClick('logout')} href="#">Logout</a>)}

                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button
                className="nav-btn"
                onClick={showNavbar}>
                <FaBars />
            </button>
        </>
    )
}
