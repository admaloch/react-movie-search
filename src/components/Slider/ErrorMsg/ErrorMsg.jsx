import React from 'react'
import { typeTheme } from '../../../store/TypeContext'
import './ErrorMsg.css'
export default function ErrorMsg() {

    const { currType } = typeTheme()
    console.log(currType)
    return (
        <div className="error-msg-container">
            <p>We couldn&apos;t find anything for that. Try searching for a specific topic or {currType.errorMsg} to get better results </p>
        </div>

    )
}
