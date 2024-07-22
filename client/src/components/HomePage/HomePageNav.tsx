import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import './HomeLayout.css'
import { NavLink } from "react-router-dom";
import brain from '../../../public/brain.png'

function HomePageNavAlt() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    };

    return (
        <header>
            <NavLink className="logo" to="/">
                
                    <h3>MovieBrain</h3>
                    <img src={brain} alt="brain-icon" />
               
            </NavLink>


            <nav ref={navRef}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/search">Search</NavLink>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/login">Login</NavLink>
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
