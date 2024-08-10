import LoadAnimation from '../../../components/UI/LoadAnimation/LoadAnimation'
import LoadingProps from '../../../models/LoadingProps'
export default function KeyRequestAnimation({ isLoading }: LoadingProps): JSX.Element {
    return (
        
            <LoadAnimation isLoading={isLoading} />
       
    )
}
