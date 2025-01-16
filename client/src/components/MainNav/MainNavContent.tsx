import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import LogoutUser from "../../features/users/LogoutUser";
import useAuth from "../../hooks/useAuth";

export default function MainNavIsLoggedInItems() {
  const { isLoggedIn, id } = useAuth();

  const navRef = useRef<HTMLDivElement | null>(null);

  const showNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.add("responsive_nav");
    }
  };

  const closeNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.remove("responsive_nav");
    }
  };

  let isLoggedInItems;

  if (isLoggedIn && id) {
    isLoggedInItems = (
      <>
        <LogoutUser closeNavbar={closeNavbar} />
        <NavLink to={`/profiles/${id}`} onClick={closeNavbar}>
          My Profile
        </NavLink>
      </>
    );
  } else {
    isLoggedInItems = (
      <>
        <NavLink to="/users/register" onClick={closeNavbar}>
          Register
        </NavLink>
        <NavLink to="/login" onClick={closeNavbar}>
          Login
        </NavLink>
      </>
    );
  }

  return (
    <>
      <nav ref={navRef}>
        <NavLink to="/" onClick={closeNavbar}>
          Home
        </NavLink>
        <NavLink to="/search" onClick={closeNavbar}>
          Search
        </NavLink>
        <NavLink to="/profiles" onClick={closeNavbar} end>
          All Users
        </NavLink>
        {isLoggedInItems}
        <button
          className="nav-close-btn"
          onClick={closeNavbar}
          aria-label="Close navigation"
        >
          <FaTimes aria-hidden="true" />
        </button>
      </nav>
      <button
        className="nav-btn"
        onClick={showNavbar}
        aria-label="Open navigation"
      >
        <FaBars />
      </button>
    </>
  );
}
