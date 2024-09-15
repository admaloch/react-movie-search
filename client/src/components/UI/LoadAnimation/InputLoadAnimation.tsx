import './InputLoadAnimation.css'

interface InputLoadAnimationProps {
    style: object;
}

export default function InputLoadAnimation({ style }: InputLoadAnimationProps): JSX.Element {
    return (
        <div style={style} className="small-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}