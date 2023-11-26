import React from 'react'
import { useState, useEffect } from 'react'
import { useAPIContext } from '../../../store/APIContext/APIContext'
import { useTypeContext } from '../../../store/searchTypeContext/TypeContext'
import { useSpring, animated } from 'react-spring'
import './ErrorMsg.css'

function ErrorMsg() {
    const { currType } = useTypeContext()
    const { submittedSearch, apiResults } = useAPIContext()
    const [isSearchValid, setIsSearchValid] = useState(true)

    console.log("react-spring loaded successfully");

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

    // Define the fade animation
    const fade = useSpring({
        opacity: isSearchValid ? 0 : 1, // If isSearchValid is true, set opacity to 0 (fade out), otherwise set it to 1 (fade in)
    })

    return (
        <animated.div style={fade} className="error-msg-container">
            <p>We couldn&apos;t find anything for that. Try searching for a specific topic or {currType.errorMsg} to get better results </p>
        </animated.div>
    )
}

export default React.memo(ErrorMsg)
