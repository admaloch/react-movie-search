import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAPIContext } from '../../../store/APIContext/APIContext'
import { useTypeContext } from '../../../store/searchTypeContext/TypeContext'
import './ErrorMsg.css'

function ErrorMsg() {
    const { currType } = useTypeContext()
    const { submittedSearch, apiResults } = useAPIContext()
    const [isSearchValid, setIsSearchValid] = useState(true)

    useEffect(
        function testData() {
            if (submittedSearch.length > 0 && apiResults.length === 0) {
                setIsSearchValid(false)
            } else if (!isSearchValid && submittedSearch.length === 0) {
                return;
            } else {
                setIsSearchValid(true)
            }
        },
        [submittedSearch]
    )
    const errorStyle = isSearchValid
        ? { opacity: 0, height: '0px' }
        : { opacity: 1, height: 'auto' }
    return (
        <div style={errorStyle} className="error-msg-container">
            <p>We couldn&apos;t find anything for that. Try searching for a specific topic or {currType.errorMsg} to get better results </p>
        </div>
    )
}
export default React.memo(ErrorMsg)