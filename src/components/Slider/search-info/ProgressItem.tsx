import React from "react"
import ProgressItemProps from "../../../models/ProgressItemProps"

const ProgressItem = ({ id, isActive, changeIndexHandler }: ProgressItemProps): JSX.Element => {
    const progItemHandler = (id: number) => {
        changeIndexHandler(id)
    }
    return (
        <div
            onClick={() => progItemHandler(id)}
            className={isActive ? 'progress-item active' : 'progress-item'}
        >
        </div>
    )
}
export default ProgressItem;