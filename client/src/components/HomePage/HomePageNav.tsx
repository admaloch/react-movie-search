import React, { useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import './HomeLayout.css';
import brain from '../../../public/brain.png';

function HomePageNavAlt() {
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
        <header>
            <NavLink className="logo" to="/">
                <h3>MovieBrain</h3>
                <img src={brain} alt="brain-icon" />
            </NavLink>

            <nav ref={navRef}>
                <a onClick={() => handleNavClick('/')} href="#">Home</a>
                <a onClick={() => handleNavClick('/search')} href="#">Search</a>
                <a onClick={() => handleNavClick('/register')} href="#">Register</a>
                <a onClick={() => handleNavClick('/login')} href="#">Login</a>
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
        </header>
    );
}

export default HomePageNavAlt;
