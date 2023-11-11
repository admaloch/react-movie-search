import LoadAnimation from '../UI/LoadAnimation/LoadAnimation'
import LoadingProps from '../../models/LoadingProps'

export default function KeyRequestAnimation({ isLoading }: LoadingProps): JSX.Element {
    return (
        <div className="animation-container">
            <LoadAnimation isLoading={isLoading} />
        </div>
    )
}
