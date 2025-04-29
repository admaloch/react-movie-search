import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import LogoutUser from "../../features/users/LogoutUser";
import useAuth from "../../hooks/useAuth";

export default function MainNavIsLoggedInItems() {
  const { isLoggedIn, id } = useAuth();

  const [isNavOpen, setIsNavOpen] = useState(false); // State to track if the nav is open
  const [isNavShown, setIsNavShown] = useState(window.innerWidth > 933); // State to track if the nav is shown
  const navRef = useRef<HTMLDivElement | null>(null);
  const firstNavLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsNavShown(window.innerWidth > 933);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showNavbar = () => {
    setIsNavOpen(true);

    setTimeout(() => {
      firstNavLinkRef.current?.focus(); // Focus the first NavLink
    }, 100); // Small delay to allow DOM update
  };

  const closeNavbar = () => {
    setIsNavOpen(false);
  };

  let isLoggedInItems;

  const navLinkStyle = {
    display: isNavShown || isNavOpen ? "block" : "none",
  };

  if (isLoggedIn && id) {
    isLoggedInItems = (
      <>
        <LogoutUser navLinkStyle={navLinkStyle} closeNavbar={closeNavbar} />
        <NavLink
          style={navLinkStyle}
          to={`/profiles/${id}`}
          onClick={closeNavbar}
        >
          My Profile
        </NavLink>
      </>
    );
  } else {
    isLoggedInItems = (
      <>
        <NavLink
          style={navLinkStyle}
          to="/users/register"
          onClick={closeNavbar}
        >
          Register
        </NavLink>
        <NavLink style={navLinkStyle} to="/login" onClick={closeNavbar}>
          Login
        </NavLink>
      </>
    );
  }

  return (
    <>
      <nav
        ref={navRef}
        className={isNavOpen ? "responsive_nav" : ""}
      >
        
        <NavLink
          ref={firstNavLinkRef}
          style={navLinkStyle}
          to="/"
          onClick={closeNavbar}
        >
          Home
        </NavLink>
        <NavLink style={navLinkStyle} to="/search" onClick={closeNavbar}>
          Search
        </NavLink>
        <NavLink style={navLinkStyle} to="/profiles" onClick={closeNavbar} end>
          All Users
        </NavLink>

        {isLoggedInItems}

        <button
          className="nav-close-btn"
          style={{ display: isNavOpen ? "block" : "none" }}
          onClick={closeNavbar}
          aria-label="Close navigation"
        >
          <FaTimes  />
        </button>
      </nav>

      <button
        className="nav-btn"
        onClick={showNavbar}
        aria-label="Open navigation"
        aria-expanded={isNavOpen}
      >
        <FaBars />
      </button>
    </>
  );
}
