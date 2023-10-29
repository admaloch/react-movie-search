
import { useState } from "react"
import "./LoadContainer.css"
export default function LoadContainer() {



    return (
        <div className="loading-container d-flex justify-content-center align-items-center">
            <h3>Loading</h3>
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>

    )
}
