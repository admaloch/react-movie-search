import SettingsIcon from '@mui/icons-material/Settings';
import PopoverIcon from '../../reviews/PopoverIcon';
import useAuth from '../../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';

export default function UserSettingsIcon() {
    const navigate = useNavigate()

    const { id: urlUserId } = useParams()
    const { id: currUserId } = useAuth()

    const isCurrUser = urlUserId === currUserId

    if (!isCurrUser) return null

    const settingsNavHandler = () => {
        navigate(`/profiles/${currUserId}/edit`)
    }

    return (
        <div className="account-settings-icon">
            <PopoverIcon popoverText='View your account settings'>
                <SettingsIcon onClick={settingsNavHandler} sx={{ fontSize: 33 }} />
            </PopoverIcon>
        </div>

    )
}
