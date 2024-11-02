import './CircleAnimation.css'

interface CircleAnimationProps {
    color?: string;
    bgColor?: string;
}

export default function CircleAnimation({ color = 'var(--color2)', bgColor = 'transparent'}: CircleAnimationProps): JSX.Element {


    return (
        <div style={{backgroundColor: bgColor}} className="circle-container">
         
                <div style={{color: color}} className="circle-animation">
                    <div style={{backgroundColor: color}}></div>
                    <div style={{backgroundColor: color}}></div>
                    <div style={{backgroundColor: color}}></div>
                    <div style={{backgroundColor: color}}></div>
                    <div style={{backgroundColor: color}}></div>
                    <div style={{backgroundColor: color}}></div>
                    <div style={{backgroundColor: color}}></div>
                    <div style={{backgroundColor: color}}></div>
                    <div style={{backgroundColor: color}}></div>
                    <div style={{backgroundColor: color}}></div>
                    <div style={{backgroundColor: color}}></div>
                    <div style={{backgroundColor: color}}></div>
                </div>
                <span style={{color: color}}>Loading</span>
           
        </div>
    )
}
