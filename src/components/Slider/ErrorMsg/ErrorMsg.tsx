import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useTheme } from '../../../store/APIContext/APIContext'
import { typeTheme } from '../../../store/searchTypeContext/TypeContext'
import './ErrorMsg.css'
export default function ErrorMsg() {

    const { currType } = typeTheme()
    const { submittedSearch, apiResults } = useTheme()
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
        ? { opacity: 0 }
        : { opacity: 1 }




    return (
        <div style={errorStyle} className="error-msg-container">
            <p>We couldn&apos;t find anything for that. Try searching for a specific topic or {currType.errorMsg} to get better results </p>
        </div>

    )
}
