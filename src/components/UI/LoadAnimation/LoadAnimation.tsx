import LoadingProps from '../../../models/LoadingProps'
import './LoadAnimation.css'
import React from 'react'

export default function LoadAnimation({ isLoading }: LoadingProps):JSX.Element {
    return (
        <>
            <div style={{ opacity: isLoading ? 1 : 0 }} className="load-animation"><div></div><div></div><div></div><div></div></div>
        </>
    )
}
