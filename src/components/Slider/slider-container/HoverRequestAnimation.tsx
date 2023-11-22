import CircleAnimation from '../../UI/LoadAnimation/CircleAnimation'
import LoadingProps from '../../../models/LoadingProps'
import React from 'react'
export default function HoverRequestAnimation({ isLoading }: LoadingProps): JSX.Element {

    return (
        <div  className="circle-container">
            <CircleAnimation />
        </div>
    )
}
