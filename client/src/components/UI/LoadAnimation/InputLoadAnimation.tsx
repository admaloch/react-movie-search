import './InputLoadAnimation.css'

export default function InputLoadAnimation({ placementStyle }): JSX.Element {
    return (
        <div style={placementStyle} className="small-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}