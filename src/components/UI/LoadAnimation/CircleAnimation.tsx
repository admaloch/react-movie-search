import LoadingProps from '../../../models/LoadingProps'
import './CircleAnimation.css'
import React from 'react'

export default function CircleAnimation({ isLoading }: LoadingProps):JSX.Element {
    return (
        <>
            <div style={{ opacity: isLoading ? 1 : 0 }} className="circle-animation"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </>
    )
}
