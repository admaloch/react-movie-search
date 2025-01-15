import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import './Error.css'

interface ItemErrorProps {
    text: string;
    faceSize?: number;
}

export default function ItemError({ text, faceSize = 50 }: ItemErrorProps): JSX.Element {
    return (
        <div className="error-content item-error">
            <SentimentDissatisfiedIcon sx={{ fontSize: faceSize }} />
            <span>{text}</span>
        </div>
    );
}
