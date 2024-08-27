import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import './Error.css'
import { NavLink, useNavigate } from 'react-router-dom';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import useAuth from '../../../hooks/useAuth';

export default function ItemError({ text }) {


    return (
            <div className="error-content item-error">
                <SentimentDissatisfiedIcon sx={{ fontSize: 50 }} />
                <span>{text}</span>
            </div>
    );
}
