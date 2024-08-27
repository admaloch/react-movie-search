import SettingsIcon from '@mui/icons-material/Settings';
import PopoverIcon from '../../reviews/PopoverIcon';
import useAuth from '../../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function UserSettingsIcon() {
    const navigate = useNavigate()

    const { id: urlUserId } = useParams()
    const { id: currUserId } = useAuth()

    if (!urlUserId || !currUserId) return null

    const isCurrUser = urlUserId === currUserId

    if (!isCurrUser) return null

    const settingsNavHandler = () => {
        navigate(`/profiles/${currUserId}/edit`)
    }

    return (
        <div className="account-settings-icon">
            <IconButton className='custom-icon-button' onClick={settingsNavHandler} aria-label="update liked list">
                <Tippy content="View your account settings">
                    <SettingsIcon sx={{ fontSize: 33 }} />
                </Tippy>
            </IconButton>
        </div>


    )
}
