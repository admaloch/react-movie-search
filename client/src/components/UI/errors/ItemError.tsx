import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import './Error.css'
import TextProps from '../../../models/TextProps';

export default function ItemError({ text }:TextProps): JSX.Element {
    return (
            <div className="error-content item-error">
                <SentimentDissatisfiedIcon sx={{ fontSize: 50 }} />
                <span>{text}</span>
            </div>
    );
}
