import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import './Error.css'

export default function ItemError({ text }: {text: string}): JSX.Element {
    return (
            <div className="error-content item-error">
                <SentimentDissatisfiedIcon sx={{ fontSize: 50 }} />
                <span>{text}</span>
            </div>
    );
}
