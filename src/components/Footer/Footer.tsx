import './Footer.css'
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer(): JSX.Element {
    return (
        <div className='footer'>
            <p>Developed by Davis Maloch</p>
            <p>Created using OMDB API</p>
            <a href="https://github.com/admaloch">
                <GitHubIcon sx={{ marginRight: .5 }}/>
                Github</a>
        </div>
    )
}
