import LoadingProps from '../../../models/LoadingProps'
import './LoadAnimation.css'
import React from 'react'

export default function LoadAnimation({ isLoading }: LoadingProps): JSX.Element {

    const loadStyle = isLoading
        ? { opacity: 1, zIndex: 150 }
        : { opacity: 0, zIndex: 0 }
    return (
        <>
            <div style={loadStyle} className="load-animation"><div></div><div></div><div></div><div></div></div>
        </>
    )
}
