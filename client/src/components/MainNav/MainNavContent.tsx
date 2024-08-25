import { useEffect, useRef, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import LogoutUser from '../../features/users/LogoutUser';
import useAuth from '../../hooks/useAuth';

export default function MainNavContent() {



    const { isLoggedIn, id } = useAuth()

    console.log(id)

    const navRef = useRef();

    const [navDelay, setNavDelay] = useState(window.innerWidth > 1024 ? 0 : 500);

    const navigate = useNavigate();

    const showNavbar = () => {
        navRef.current.classList.add("responsive_nav");
    };
    const closeNavbar = () => {
        navRef.current.classList.remove("responsive_nav");
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setNavDelay(0);
                closeNavbar()
            } else {
                setNavDelay(500);
            }
        };
        window.addEventListener('resize', handleResize);
        // Initial check
        handleResize();
        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleNavClick = (path) => {
        closeNavbar()
        setTimeout(() => {
            navigate(path);
        }, navDelay);
    };

    return (
        <>
            <nav ref={navRef}>
                <a onClick={() => handleNavClick('/')} href="#">Home</a>
                <a onClick={() => handleNavClick('/search')} href="#">Search</a>

                {isLoggedIn ? (
                    <>
                        <LogoutUser
                            closeNavbar={closeNavbar}
                            navDelay={navDelay}
                        />
                        <a onClick={() => handleNavClick(`/profiles/${id}`)} href="#">MyProfile</a>
                    </>
                ) : (
                    <>
                        <a onClick={(e) => { e.preventDefault(); handleNavClick('/users/register'); }} href="#">Register</a>
                        <a onClick={(e) => { e.preventDefault(); handleNavClick('/login'); }} href="#">Login</a>
                    </>
                )}
                <a onClick={() => handleNavClick('/profiles')} href="#">All users</a>




                <button
                    className="nav-btn nav-close-btn"
                    onClick={closeNavbar}>
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
