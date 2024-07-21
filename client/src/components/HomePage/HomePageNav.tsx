import brain from '../../../public/brain.png'
export default function HomePageNav() {
    return (
        <nav className="home-page-nav">
            <div className="nav-container">
                <div className="logo">
                    <h3>MovieBrain</h3>
                    <img src={brain} alt="brain-icon" />
                </div>
                <div className="nav-links">
                    <p className="active-link">Home</p>
                    <p>Search</p>
                    <p>Register</p>
                    <p>Login</p>
                </div>
            </div>


        </nav>
    )
}
