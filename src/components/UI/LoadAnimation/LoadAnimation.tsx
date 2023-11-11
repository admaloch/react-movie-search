import LoadingProps from '../../../models/LoadingProps'
import './LoadAnimation.css'

export default function LoadAnimation({ isLoading }: LoadingProps) {
    return (
        <>
            <div style={{ opacity: isLoading ? 1 : 0 }} className="load-animation"><div></div><div></div><div></div><div></div></div>
        </>
    )
}
