import { Link, Outlet } from 'react-router-dom';
import './Footer.css'
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer(): JSX.Element {
    return (
        <>
           <Outlet />
    <footer className='footer'>
        <p>Developed by Davis Maloch</p>
        <p>Created using OMDB API</p>
        <a href="https://github.com/admaloch">
            <GitHubIcon sx={{ marginRight: .5 }} />
            Github
        </a>
        <p>
            <Link to="/credits">Credits</Link> {/* Add router link to /credits */}
        </p>
    </footer>
        </>

    )
}
