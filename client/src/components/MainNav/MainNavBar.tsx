import { useState, useEffect } from "react";
import "./MainNavBar.css";
import MainNavLogo from "./MainNavLogo";
import MainNavContent from "./MainNavContent";
import { isTouchDevice } from "../../utility/utility";
import { Outlet } from "react-router-dom";

function MainNavBar() {
  const [showNavbar, setShowNavbar] = useState(true);

  let lastScrollY = 0;
  // Scroll handler -  hide if scrolling down and show if scrolling up
  const handleScroll = () => {
    if (window.scrollY > lastScrollY && scrollY > 20) {
      setShowNavbar(false);
    } else setShowNavbar(true);
    lastScrollY = window.scrollY; // Update lastScrollY to current position
  };

  // Only add scroll listener if it's a touch device
  useEffect(() => {
    if (isTouchDevice()) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className="header-container"
        style={{ top: showNavbar ? "0" : "-80px", transition: "top 0.3s" }}
      >
        <div className="header-content">
          {/* Skip Link for Accessibility */}
          <a href="#main-content" className="skip-link">
            Skip to Main Content
          </a>
          <MainNavLogo />
          <MainNavContent />
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default MainNavBar;
