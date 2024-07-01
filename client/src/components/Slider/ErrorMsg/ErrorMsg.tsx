import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAPIContext } from '../../../store/APIContext/APIContext'
import { useTypeContext } from '../../../store/searchTypeContext/TypeContext'
import './ErrorMsg.css'

function ErrorMsg() {
    const { currType, searchTypes } = useTypeContext()
    const { submittedSearch, apiResults } = useAPIContext()
    const [showErrorMsg, setShowErrorMsg] = useState(false)

    useEffect(
        function hideErrMsgStateHandler() {
            if (submittedSearch.length > 0 && apiResults.length === 0) {
                setShowErrorMsg(true)
            } else if (!showErrorMsg && submittedSearch.length === 0) {
                return;
            } else {
                setShowErrorMsg(false)
            }
        },
        [submittedSearch]
    )
    useEffect(
        function eraseErrOnTypeChange() {
            setShowErrorMsg(false)
        }, [searchTypes]
    )

    const errorClass = showErrorMsg
        ? 'error-msg-container show-error'
        : 'error-msg-container remove-error'

    return (
        <div className={errorClass}>
            <p>We couldn&apos;t find anything for that. Try searching for a specific topic or {currType.errorMsg} to get better results </p>
        </div>
    )
}
export default React.memo(ErrorMsg)