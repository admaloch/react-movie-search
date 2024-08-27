import { NavLink } from 'react-router-dom';
import brain from '../../assets/brain.png'

export default function MainNavLogo() {
    return (
        <NavLink className="logo" to="/">
            <h3>MovieBrain</h3>
            <img src={brain} alt="brain-icon" />
        </NavLink>
    )
}
