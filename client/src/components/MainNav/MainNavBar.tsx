import { useState, useEffect } from 'react';
import './MainNavBar.css';
import MainNavLogo from "./MainNavLogo";
import MainNavContent from "./MainNavContent";
import { Outlet } from 'react-router-dom';

function MainNavBar() {
    const [showNavbar, setShowNavbar] = useState(true);
    
    let lastScrollY = 0;

    // Scroll handler
    const handleScroll = () => {
        // If scrolling down
        if (window.scrollY > lastScrollY) {
            setShowNavbar(false); // Hide navbar
        } 
        // If scrolling up
        else {
            setShowNavbar(true); // Show navbar
        }
        lastScrollY = window.scrollY; // Update lastScrollY to current position
    };

    // Check if the device is a touch screen device
    const isTouchDevice = () => {
        return (
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            window.matchMedia('(pointer: coarse)').matches
        );
    };

    useEffect(() => {
        if (isTouchDevice()) {
            // Only add scroll listener if it's a touch device
            window.addEventListener('scroll', handleScroll);
        }

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <header style={{ top: showNavbar ? '0' : '-80px', transition: 'top 0.3s' }}>
                <div className="header-content">
                    <MainNavLogo />
                    <MainNavContent />
                </div>
            </header>
            <Outlet />
        </>
    );
}

export default MainNavBar;
