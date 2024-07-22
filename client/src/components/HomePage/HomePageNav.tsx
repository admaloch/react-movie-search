import { NavLink } from 'react-router-dom'
import brain from '../../../public/brain.png'

export default function HomePageNav() {
    return (
        <header className="home-page-nav">
            <div className="nav-container">
                <div className="logo">
                    <h3>MovieBrain</h3>
                    <img src={brain} alt="brain-icon" />
                </div>
                <nav className="nav-links">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/search">Search</NavLink>
                    <NavLink to="/register">Register</NavLink>
                    <NavLink to="/login">Login</NavLink>


                </nav>
            </div>


        </header>
    )
}
