import LoadAnimation from '../UI/LoadAnimation/LoadAnimation'
import LoadingProps from '../../models/LoadingProps'
import React from 'react'
export default function KeyRequestAnimation({ isLoading }: LoadingProps): JSX.Element {
    return (
        
            <LoadAnimation isLoading={isLoading} />
       
    )
}
