import LoadAnimation from '../UI/LoadAnimation/LoadAnimation'

export default function KeyRequestAnimation({ isLoading }) {

    return (
        <div className="animation-container">
            <LoadAnimation isLoading={isLoading} />
        </div>

    )
}
