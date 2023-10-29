
import { useState } from "react"
import '../../UI/LoadContainer/LoadContainer.css'
export default function LoadContainer({ isLoading }) {



    return (
        <>
            <div style={{ opacity: isLoading ? 1 : 0 }} class="load-animation"><div></div><div></div><div></div><div></div></div>
        </>

    )
}
