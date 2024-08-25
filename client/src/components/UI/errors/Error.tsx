import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import './Error.css'

export default function Error({ text, item }: string) {
    return (
        <div className="main-item-content">
            <div className="error-content">
                <SentimentDissatisfiedIcon sx={{ fontSize: 100 }} />
                <h2>{text}</h2>
                {item}
            </div>

        </div>

    )
}
