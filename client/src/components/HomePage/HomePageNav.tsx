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
                    <p className="active-link">Home</p>
                    <p>Search</p>
                    <p>Register</p>
                    <p>Login</p>
                </nav>
            </div>


        </header>
    )
}
