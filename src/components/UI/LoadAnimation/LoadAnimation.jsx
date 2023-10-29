
import '../../UI/LoadAnimation/LoadAnimation.css'
export default function LoadAnimation({ isLoading }) {



    return (
        <>
            <div style={{ opacity: isLoading ? 1 : 0 }} className="load-animation"><div></div><div></div><div></div><div></div></div>
        </>

    )
}
