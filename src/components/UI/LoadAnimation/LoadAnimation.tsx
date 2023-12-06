import LoadingProps from '../../../models/LoadingProps'
import './LoadAnimation.css'
import React from 'react'

export default function LoadAnimation({ isLoading }: LoadingProps): JSX.Element {
    return (
        <>
            <div style={{ display: isLoading ? 'block' : 'none' }} className="load-animation"><div></div><div></div><div></div><div></div></div>
        </>
    )
}
