import React, { useRef, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';


export default function MainNavContent() {
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
            navigate(path);
            setIsNavigating(false);
        }, delay);
    };

    return (
        <>
            <nav ref={navRef}>
                <a onClick={() => handleNavClick('/')} href="#">Home</a>
                <a onClick={() => handleNavClick('/search')} href="#">Search</a>
                <a onClick={() => handleNavClick('/register')} href="#">Register</a>
                <a onClick={() => handleNavClick('/login')} href="#">Login</a>
                <a onClick={() => handleNavClick('/liked')} href="#">Liked</a>
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
