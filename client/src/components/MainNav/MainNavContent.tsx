import { useEffect, useRef, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutUser from '../../features/users/LogoutUser';
import useAuth from '../../hooks/useAuth';

export default function MainNavContent() {



    const { isLoggedIn, id } = useAuth()
    // console.log(isLoggedIn)

    // console.log(id)

    const navRef = useRef();

    const [navDelay, setNavDelay] = useState(window.innerWidth > 1024 ? 0 : 500);

    const navigate = useNavigate();

    const showNavbar = () => {
        navRef.current.classList.add("responsive_nav");
    };
    const closeNavbar = () => {
        navRef.current.classList.remove("responsive_nav");
    };

   

    return (
        <>
            <nav ref={navRef}>
                <NavLink to="/" onClick={closeNavbar}>Home</NavLink>
                <NavLink to="/search" onClick={closeNavbar}>Search</NavLink>
                <NavLink to="/profiles" onClick={closeNavbar} end>All Users</NavLink>

                {isLoggedIn && id ? (
                    <>
                        <LogoutUser closeNavbar={closeNavbar} navDelay={navDelay} />
                        <NavLink to={`/profiles/${id}`} onClick={closeNavbar}>My Profile</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/users/register" onClick={closeNavbar}>Register</NavLink>
                        <NavLink to="/login" onClick={closeNavbar}>Login</NavLink>
                    </>
                )}

                <button className="nav-close-btn" onClick={closeNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button>
        </>
    );
}
