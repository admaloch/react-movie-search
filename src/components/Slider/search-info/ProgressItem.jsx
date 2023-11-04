

const ProgressItem = ({ id, isActive, changeIndexHandler }) => {

    const progItemHandler = (id) => {
        console.log(id)
        changeIndexHandler(id)
    }

    return (
        // <div className="progress-item"></div>
        <div
            onClick={() => progItemHandler(id)}
            className={isActive ? 'progress-item active' : 'progress-item'}
        >

        </div>
    )
}
export default ProgressItem;