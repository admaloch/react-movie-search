import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAPIContext } from '../../../store/APIContext/APIContext'
import { useTypeContext } from '../../../store/searchTypeContext/TypeContext'
import './ErrorMsg.css'

function ErrorMsg() {
    const { currType, searchTypes } = useTypeContext()
    const { submittedSearch, apiResults } = useAPIContext()
    const [hideErrorMsg, sethideErrorMsg] = useState(true)

    useEffect(
        function hideErrMsgStateHandler() {
            if (submittedSearch.length > 0 && apiResults.length === 0) {
                sethideErrorMsg(false)
            } else if (!hideErrorMsg && submittedSearch.length === 0) {
                return;
            } else {
                sethideErrorMsg(false)
            }
        },
        [submittedSearch]
    )
    useEffect(
        function eraseErrOnTypeChange() {
            sethideErrorMsg(true)
        }, [searchTypes]
    )

    const errorStyle = hideErrorMsg
        ? { opacity: 0, height: '0px' }
        : { opacity: 1, height: 'auto' }
    return (
        <div style={errorStyle} className="error-msg-container">
            <p>We couldn&apos;t find anything for that. Try searching for a specific topic or {currType.errorMsg} to get better results </p>
        </div>
    )
}
export default React.memo(ErrorMsg)